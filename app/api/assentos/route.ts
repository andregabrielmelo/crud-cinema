import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteTicket } from "../ingressos/route";

type avaibleSeat = { id: number; id_sala: number; codigo: string; vip: boolean; avaible?: boolean }[]

export async function GET(request: NextRequest) {
    const cursor = request.headers.get("cursor")
    const sessionID = request.headers.get("sessao")
    if (!cursor) {
        return new NextResponse("cursor é obrigatório", {
            status: 400
        })
    }
    if (sessionID) {
        try {
            const session = await prisma.sessoes.findFirst({
                where: {
                    id: parseInt(sessionID)
                }
            })
            const seats: avaibleSeat = await prisma.assentos.findMany({
                where: {
                    id_sala: session?.id_sala
                }
            })
            const selledTickets = await prisma.ingressos.findMany({
                where: {
                    id_sessao: session?.id
                },
                include: {
                    assentos: true
                }
            })
            seats.forEach(seat => {
                if (selledTickets.find(ticket => ticket.assentos.id == seat.id)) {
                    seat.avaible = false
                }
                else {
                    seat.avaible = true
                }
            })
            return new NextResponse(JSON.stringify(seats), {
                status: 200,
            });
        } catch (e) {
            return new NextResponse(JSON.stringify(e), {
                status: 400,
            });
        }
    }
    const assentos = await prisma.assentos.findMany({
        skip: parseInt(cursor) * 20,
        take: 20
    })
    return new NextResponse(JSON.stringify(assentos), {
        status: 200,
    });
}


export async function POST(request: NextRequest) {
    try {
        const bodyData: Prisma.$assentosPayload["scalars"] = await request.json();
        const salaExists = await prisma.salas.count({
            where: {
                id: bodyData.id_sala
            }
        })
        if (!salaExists) {
            throw "Sala não existente"
        }
        if (await prisma.assentos.count({
            where: {
                id_sala: bodyData.id_sala,
                codigo: bodyData.codigo
            }
        })) {
            throw "Ja existe assento com este código"
        }
        const newSeat = await prisma.assentos.create({
            data: bodyData
        })

        return new NextResponse(newSeat.id.toString(), {
            status: 200
        })
    } catch (e) {
        return new NextResponse(JSON.stringify(e), {
            status: 400
        })
    }

}

export async function DELETE(request: NextRequest) {
    const itemID = request.headers.get("id")
    if (!itemID) {
        return new NextResponse("id é obrigatório", {
            status: 400
        })
    }
    try {
        await prisma.assentos.delete({
            where: {
                id: parseInt(itemID)
            }
        })
        const tickets = await prisma.ingressos.findMany({
            where: {
                id_assento: parseInt(itemID),
                sessoes: {
                    horario_inicial: {
                        gte: new Date()
                    }
                }
            }
        })
        await tickets.map(async (item) => {
            await DeleteTicket(item.id)
        })

        return new NextResponse("assento excluido", {
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
        const bodyData: Prisma.$assentosPayload["scalars"] = await request.json()
        const itemID = request.headers.get("id")
        if (!itemID) {
            return new NextResponse("id é obrigatório", {
                status: 400
            })
        }
        await prisma.assentos.update({
            data: {
                codigo: bodyData.codigo
            },
            where:
            {
                id: parseInt(itemID)
            }
        })
        return new NextResponse("assento editado com sucesso", {
            status: 200
        })
    } catch (e) {
        return new NextResponse(JSON.stringify(e), {
            status: 400
        })
    }
}