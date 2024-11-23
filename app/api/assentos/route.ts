import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteTicket } from "@api/ingressos/route";

type avaibleSeat = {
  id: number;
  id_sala: number;
  codigo: string;
  vip: boolean;
  avaible?: boolean;
}[];

export async function GET(request: NextRequest) {
  // Pega o cursor da requisição
  const cursor = request.headers.get("cursor");

  // Pega o id da sessão da requisição
  const sessionID = request.headers.get("sessao");

  // Se não tiver cursor, retorna erro
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }

  // Se tiver id da sessão, retorna os assentos disponíveis naquela sessão
  if (sessionID) {
    try {
      // SELECT * FROM sessoes WHERE id = sessionID LIMIT 1;
      const session = await prisma.sessoes.findFirst({
        where: {
          id: parseInt(sessionID),
        },
      });
      // SELECT * FROM assentos WHERE id_sala = session.id_sala;
      const seats: avaibleSeat = await prisma.assentos.findMany({
        where: {
          id_sala: session?.id_sala,
        },
      });
      // SELECT i.*, a.* FROM ingressos i
      // LEFT JOIN assentos a ON i.id_assento = 1
      // WHERE i.id_sessao = 1;
      const selledTickets = await prisma.ingressos.findMany({
        where: {
          id_sessao: session?.id,
        },
        include: {
          assentos: true,
        },
      });
      seats.forEach((seat) => {
        if (selledTickets.find((ticket) => ticket.assentos.id == seat.id)) {
          seat.avaible = false;
        } else {
          seat.avaible = true;
        }
      });
      return new NextResponse(JSON.stringify(seats), {
        status: 200,
      });
    } catch (e) {
      return new NextResponse(JSON.stringify(e), {
        status: 400,
      });
    }
  }

  // Se não tiver id da sessão, retorna todos os assentos
  // Pula os (20 * cursor) primeiros assentos e pega os próximos 20
  // SELECT * FROM assentos LIMIT cursor, 20;
  const assentos = await prisma.assentos.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });
  return new NextResponse(JSON.stringify(assentos), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  // Pega o corpo da requisição
  try {
    const bodyData: Prisma.$assentosPayload["scalars"] = await request.json();
    // SELECT COUNT(*) FROM salas WHERE id = bodyData.id_sala;
    const salaExists = await prisma.salas.count({
      where: {
        id: bodyData.id_sala,
      },
    });
    if (!salaExists) {
      throw "Sala não existente";
    }
    if (
      // SELECT COUNT(*) FROM assentos WHERE id_sala = bodyData.id_sala AND codigo = bodyData.codigo;
      await prisma.assentos.count({
        where: {
          id_sala: bodyData.id_sala,
          codigo: bodyData.codigo,
        },
      })
    ) {
      throw "Ja existe assento com este código";
    }
    // INSERT INTO assentos (id_sala, codigo, vip) VALUES (bodyData.id_sala, bodyData.codigo, bodyData.vip);
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

export async function DeleteSeat(itemID: number) {
  // DELETE FROM ingressos WHERE id_assento = itemID;
  await prisma.assentos.delete({
    where: {
      id: itemID,
    },
  });
  // SELECT i.* FROM ingressos i
  // JOIN sessoes s ON i.id_sessao = s.id
  // WHERE i.id_assento = 1 AND s.horario_inicial >= NOW();
  const tickets = await prisma.ingressos.findMany({
    where: {
      id_assento: itemID,
      sessoes: {
        horario_inicial: {
          gte: new Date(),
        },
      },
    },
  });
  await tickets.map(async (item) => {
    await DeleteTicket(item.id);
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const itemID = request.headers.get("id");
    if (!itemID) {
      throw "id é obrigatório";
    }

    await DeleteSeat(parseInt(itemID));
    return new NextResponse("assento excluido", {
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
    const bodyData: Prisma.$assentosPayload["scalars"] = await request.json();
    const itemID = request.headers.get("id");
    if (!itemID) {
      throw "id é obrigatório";
    }
    // UPDATE assentos SET codigo = bodyData.codigo, vip = bodyData.vip WHERE id = itemID;
    const editedItem = await prisma.assentos.update({
      data: {
        codigo: bodyData.codigo,
        vip: bodyData.vip,
      },
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
