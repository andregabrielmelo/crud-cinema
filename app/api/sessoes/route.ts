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
    const sessoes = await prisma.sessoes.findMany({
        skip : parseInt(cursor) * 20,
        take : 20
    })
    return new NextResponse(JSON.stringify(sessoes), {
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

        await prisma.sessoes.delete({
            where: {
                id: parseInt(itemID)
            }
        })
    } catch (e) {
        return new NextResponse("erro ao excluir o registro", {
            status: 400
        })
    }
    return new NextResponse("registro excluido", {
        status: 200
    })
}

export async function POST(request: NextRequest) {
    try {
        const bodyData: Prisma.$sessoesPayload["scalars"] = await request.json();
        const salaExists = await prisma.salas.count({where : {
            id : bodyData.id_sala
        }}) 
        if(!salaExists){
            throw "Sala não existente"
        }
        const newSession = await prisma.sessoes.create({
            data: bodyData
        })

        return new NextResponse(newSession.id.toString(), {
            status: 200
        })
    } catch (e) {
        return new NextResponse("erro ao incluir o registro", {
            status: 400
        })
    }

}

export async function PUT(request: NextRequest) {
    try {
        const bodyData : Prisma.$sessoesPayload["scalars"] = await request.json()
        const itemID = request.headers.get("id")
        if (!itemID) {
            return new NextResponse("id é obrigatório", {
                status: 400
            })
        }
        await prisma.sessoes.update({
            data: bodyData,
            where:
            {
                id: parseInt(itemID)
            }
        })
        return new NextResponse("registro editado com sucesso", {
            status: 200
        })
    } catch {
        return new NextResponse("erro ao atualizar o registro", {
            status: 400
        })
    }
}