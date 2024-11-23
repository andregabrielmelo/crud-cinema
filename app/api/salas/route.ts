import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteSeat } from "../assentos/route";

export async function GET(request: NextRequest) {
  const cursor = request.headers.get("cursor");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }
  // SELECT * FROM salas LIMIT cursor * 20, 20;
  const salas = await prisma.salas.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });
  return new NextResponse(JSON.stringify(salas), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  try {
    const bodyData: Prisma.$salasPayload["scalars"] = await request.json();
    bodyData.total_de_assentos = 0;
    // INSERT INTO salas (bloco, numero) VALUES (bodyData.bloco, bodyData.numero);
    const newRoom = await prisma.salas.create({
      data: bodyData,
    });

    return new NextResponse(newRoom.id.toString(), {
      status: 200,
    });
  } catch {
    return new NextResponse("erro ao incluir a sala", {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const itemID = request.headers.get("id");
  if (!itemID) {
    return new NextResponse("id é obrigatório", {
      status: 400,
    });
  }
  try {
    // SELECT * FROM assentos WHERE id_sala = itemID;
    const seats = await prisma.assentos.findMany({
      where: {
        id_sala: parseInt(itemID),
      },
    });
    // DELETE FROM assentos WHERE id_sala = itemID;
    seats.forEach(async (item) => await DeleteSeat(item.id));
    // DELETE FROM salas WHERE id = itemID;
    await prisma.salas.delete({
      where: {
        id: parseInt(itemID),
      },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
  return new NextResponse("sala excluida", {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  try {
    const bodyData: Prisma.$salasPayload["scalars"] = await request.json();
    const itemID = request.headers.get("id");
    if (!itemID) {
      throw "id é obrigatório";
    }
    // SELECT COUNT(*) FROM assentos WHERE id_sala = itemID;
    bodyData.total_de_assentos = await prisma.assentos.count({
      where: {
        id_sala: parseInt(itemID),
      },
    });
    // UPDATE salas SET bloco = bodyData.bloco, numero = bodyData.numero WHERE id = itemID;
    const editedItem = await prisma.salas.update({
      data: bodyData,
      where: {
        id: parseInt(itemID),
      },
    });
    return new NextResponse(JSON.stringify(editedItem), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
}
