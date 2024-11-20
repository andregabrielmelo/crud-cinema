import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteTicket } from "../ingressos/route";

export async function GET(request: NextRequest) {
    const cursor = request.headers.get("cursor")
    const movie = request.headers.get("movie")
    if (!cursor) {
        return new NextResponse("cursor é obrigatório", {
            status: 400
        })
    }
    const sessoes = await prisma.sessoes.findMany({
        skip: parseInt(cursor) * 20,
        take: 20,
        ...(movie ? {
            where: {
                nome_do_filme: {
                    contains: movie
                }
            }
        } : {})
    })
    return new NextResponse(JSON.stringify(sessoes), {
        status: 200,
    });
}

export async function POST(request: NextRequest) {
    try {
        const bodyData: Prisma.$sessoesPayload["scalars"] = await request.json();
        bodyData.horario_inicial = new Date(bodyData.horario_inicial)
        bodyData.horario_final = new Date(bodyData.horario_final)
        if (bodyData.horario_inicial >= bodyData.horario_final) {
            throw "O final da sessão deve ser após o inicio"
        }
        if (bodyData.horario_inicial < new Date()) {
            throw "A sessão deve ser iniciada no futuro"
        }

        const salaExists = await prisma.salas.count({
            where: {
                id: bodyData.id_sala
            }
        })
        if (!salaExists) {
            throw "Sala não existente"
        }

        if (await checkRoomavailability(bodyData.id_sala, bodyData.horario_inicial, bodyData.horario_final)) {
            throw "Este horario já está sendo utilizado nesta sala"
        }


        const newSession = await prisma.sessoes.create({
            data: bodyData
        })

        return new NextResponse(newSession.id.toString(), {
            status: 200
        })
    } catch (e) {
        return new NextResponse(JSON.stringify(e), {
            status: 400
        })
    }

}

export async function DELETE(request: NextRequest) {
    try {
        const itemID = request.headers.get("id")
        if (!itemID) {
            return new NextResponse("id é obrigatório", {
                status: 400
            })
        }
        const session = await prisma.sessoes.findFirst({
            where: {
                id: parseInt(itemID)
            },
            include: {
                ingressos: true
            }
        })
        if ((session?.horario_inicial.getTime() ?? 0) > Date.now()) {
            session?.ingressos.forEach(item => {
                DeleteTicket(item.id)
            })
        }
        await prisma.sessoes.delete({
            where: {
                id: parseInt(itemID)
            }
        })
        return new NextResponse("registro excluido", {
            status: 200
        })
    } catch (e) {
        return new NextResponse(JSON.stringify(e), {
            status: 400
        })
    }

}

export async function PUT(request: NextRequest) {
    try {
        const bodyData: Prisma.$sessoesPayload["scalars"] = await request.json()
        const itemID = request.headers.get("id")
        if (!itemID) {
            throw "id é obrigatório"
        } else if (!await prisma.sessoes.count({ where: { id: parseInt(itemID) } })) {
            throw "sessão não existente"
        }

        bodyData.horario_final = new Date(bodyData.horario_final)
        bodyData.horario_inicial = new Date(bodyData.horario_inicial)
        if (await checkRoomavailability(bodyData.id_sala, bodyData.horario_inicial, bodyData.horario_final, parseInt(itemID))) {
            throw "Este horario já está sendo utilizado nesta sala"
        }
        const editedItem = await prisma.sessoes.update({
            data: bodyData,
            where:
            {
                id: parseInt(itemID)
            }
        })
        return new NextResponse(JSON.stringify(editedItem), {
            status: 200
        })
    } catch (e) {
        return new NextResponse(JSON.stringify(e), {
            status: 400
        })
    }
}

async function checkRoomavailability(id_sala: number, horario_inicial: Date, horario_final: Date, id_sessao?: number) {
    return await prisma.sessoes.count({
        where: {
            id_sala: id_sala,
            OR: [
                {
                    horario_inicial: {
                        lte: horario_inicial
                    },
                    horario_final: {
                        gte: horario_inicial
                    }
                },
                {
                    horario_inicial: {
                        lte: horario_final
                    },
                    horario_final: {
                        gte: horario_final
                    }
                }, {
                    AND: [
                        {
                            horario_inicial: {
                                gte: horario_inicial
                            }
                        },
                        {
                            horario_inicial: {
                                lte: horario_final
                            }
                        }
                    ]
                }
            ],
            ...(id_sessao ? {
                NOT: {
                    id: id_sessao
                }
            } : {}),
        }
    })
}