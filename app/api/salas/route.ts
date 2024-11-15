import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const salas = await prisma.salas.findMany()
    return new NextResponse(JSON.stringify(salas), {
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

        await prisma.salas.delete({
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
        const bodyData : Prisma.$salasPayload["scalars"] = await request.json();
        bodyData.total_de_assentos = 0;
        const newRoom = await prisma.salas.create({
            data: bodyData
        })

        return new NextResponse(newRoom.id.toString(), {
            status: 200
        })
    } catch {
        return new NextResponse("erro ao incluir a sala", {
            status: 400
        })
    }

}