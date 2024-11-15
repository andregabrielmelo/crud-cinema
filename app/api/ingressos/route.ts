import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cursor = request.headers.get("cursor")
    if (!cursor){
        return new NextResponse("cursor é obrigatório", {
            status: 400
        })
    }
    const ingressos = await prisma.ingressos.findMany({
        skip : parseInt(cursor) * 20,
        take : 20
    })
    return new NextResponse(JSON.stringify(ingressos), {
        status: 200,
    });
}


export async function DELETE(request: NextRequest) {
    const itemID = request.headers.get("id")
    if (!itemID) {
        return new NextResponse("id é obrigatório", {
            status: 400
        })
    }
    try {
        await prisma.ingressos.delete({
            where: {
                id: parseInt(itemID)
            }
        })
    } catch (e) {
        return new NextResponse("erro ao excluir a sala", {
            status: 400
        })
    }
    return new NextResponse("sala excluida", {
        status: 200
    })
}

export async function POST(request: NextRequest) {
    try {
        const bodyData: Prisma.$ingressosPayload["scalars"] = await request.json();
        const sessionExists = await prisma.sessoes.count({where : {id : bodyData.id_sessao}})
        const seatExists = await prisma.assentos.count({where : {id : bodyData.id_assento}})
        if(!sessionExists || !seatExists){
            throw "Sessoes ou assento inexistente"
        }
        const newTicket = await prisma.ingressos.create({
            data: bodyData
        })

        return new NextResponse(newTicket.id.toString(), {
            status: 200
        })
    } catch {
        return new NextResponse("erro ao incluir o registro", {
            status: 400
        })
    }

}

export async function PUT(request: NextRequest) {
    try {
        const bodyData: Prisma.$ingressosPayload["scalars"] = await request.json()
        const itemID = request.headers.get("id")
        if (!itemID) {
            return new NextResponse("id é obrigatório", {
                status: 400
            })
        }
        await prisma.ingressos.update({
            data: bodyData,
            where:
            {
                id: parseInt(itemID)
            }
        })
        return new NextResponse("sala editada com sucesso", {
            status: 200
        })
    } catch {
        return new NextResponse("erro ao atualizar a sala", {
            status: 400
        })
    }
}