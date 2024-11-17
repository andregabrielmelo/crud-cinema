import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cursor = request.headers.get("cursor");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }
  const assentos = await prisma.assentos.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });
  return new NextResponse(JSON.stringify(assentos), {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const itemID = request.headers.get("id");
  console.log("ItemID: ", itemID);
  if (!itemID) {
    return new NextResponse("id é obrigatório " + itemID, {
      status: 400,
    });
  }
  try {
    await prisma.assentos.delete({
      where: {
        id: parseInt(itemID),
      },
    });
  } catch (e) {
    return new NextResponse("erro ao excluir o assento", {
      status: 400,
    });
  }
  return new NextResponse("assento excluido", {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  console.log("Request: Hello ", request);
  try {
    const bodyData: Prisma.$assentosPayload["scalars"] = await request.json();
    console.log("BodyData: ", bodyData);
    const salaExists = await prisma.salas.count({
      where: {
        id: bodyData.id_sala,
      },
    });
    if (!salaExists) {
      throw "Sala não existente";
    }
    const newSeat = await prisma.assentos.create({
      data: bodyData,
    });

    return new NextResponse(newSeat.id.toString(), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bodyData = await request.json();
    const itemID = request.headers.get("id");
    if (!itemID) {
      return new NextResponse("id é obrigatório", {
        status: 400,
      });
    }
    await prisma.assentos.update({
      data: bodyData,
      where: {
        id: parseInt(itemID),
      },
    });
    return new NextResponse("assento editado com sucesso", {
      status: 200,
    });
  } catch {
    return new NextResponse("erro ao atualizar o assento", {
      status: 400,
    });
  }
}
