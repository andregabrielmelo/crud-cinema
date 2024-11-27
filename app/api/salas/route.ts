import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteSeat } from "../assentos/route";

export async function GET(request: NextRequest) {
  // SELECT * FROM salas;
  const salas = await prisma.salas.findMany();
  return new NextResponse(JSON.stringify(salas), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  try {
    const bodyData: Prisma.$salasPayload["scalars"] = await request.json();
    bodyData.total_de_assentos = 0;
    // INSERT INTO salas (bloco, numero, total_de_assentos) VALUES (bodyData.bloco, bodyData.numero, 0);
    // Teste: INSERT INTO salas (bloco, numero, total_de_assentos) VALUES ("A", 1, 0);
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
    // Teste: SELECT * FROM assentos WHERE id_sala = 1;
    const seats = await prisma.assentos.findMany({
      where: {
        id_sala: parseInt(itemID),
      },
    });
    // DELETE FROM assentos WHERE id_sala = itemID;
    // Teste: DELETE FROM assentos WHERE id_sala = 1;
    // Cannot delete or update a parent row: a foreign key constraint fails
    // (`cinema`.`ingressos`, CONSTRAINT `ingressos_ibfk_2` FOREIGN KEY (`id_assento`) REFERENCES `assentos` (`id`))
    seats.forEach(async (item) => await DeleteSeat(item.id));
    // DELETE FROM salas WHERE id = itemID;
    // Teste: DELETE FROM salas WHERE id = 1;
    // Cannot delete or update a parent row: a foreign key constraint fails
    // (`cinema`.`assentos`, CONSTRAINT `assentos_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`))
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
    // Teste: SELECT COUNT(*) FROM assentos WHERE id_sala = 1;
    bodyData.total_de_assentos = await prisma.assentos.count({
      where: {
        id_sala: parseInt(itemID),
      },
    });
    // UPDATE salas SET bloco = bodyData.bloco, numero = bodyData.numero WHERE id = itemID;
    // Teste: UPDATE salas SET bloco = "A", numero = 1 WHERE id = 1;
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
