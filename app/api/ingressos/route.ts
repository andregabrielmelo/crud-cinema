import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cursor = request.headers.get("cursor");
  const sessionID = request.headers.get("sessao");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }
  // SELECT * FROM ingressos WHERE id_sessao = sessionID LIMIT cursor * 20, 20;
  const ingressos = await prisma.ingressos.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,

    ...(sessionID
      ? {
          where: {
            id_sessao: parseInt(sessionID),
          },
        }
      : {}),
  });
  return new NextResponse(JSON.stringify(ingressos), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  try {
    const bodyData: Prisma.$ingressosPayload["scalars"] = await request.json();
    // SELECT s.* FROM sessoes s
    // JOIN salas sa ON s.sala_id = sa.id
    const sessionRegister = await prisma.sessoes.findFirst({
      where: { id: bodyData.id_sessao },
      include: {
        salas: true,
      },
    });
    const seatRegister = await prisma.assentos.findFirst({
      where: { id: bodyData.id_assento },
      include: {
        salas: true,
      },
    });
    if (!sessionRegister || !seatRegister) {
      throw "Sessoes ou assento inexistente";
    }
    if (sessionRegister.salas.id != seatRegister.salas.id) {
      throw "Esse assento não pode ser reservado nesta sessão";
    }
    if (
      await prisma.ingressos.count({
        where: {
          id_sessao: bodyData.id_sessao,
          id_assento: bodyData.id_assento,
        },
      })
    ) {
      throw "Esse ingresso ja foi vendido";
    }

    bodyData.horario_venda = new Date();
    bodyData.preco = new Prisma.Decimal(seatRegister.vip ? 70 : 40);

    const newTicket = await prisma.ingressos.create({
      data: bodyData,
    });

    await prisma.vendas.create({
      data: {
        horario_venda: bodyData.horario_venda,
        preco: bodyData.preco,
        descricao: `Venda de ingresso - ${sessionRegister.nome_do_filme} - Assento ${seatRegister.codigo}, Bloco ${seatRegister.salas.bloco} Sala ${seatRegister.salas.numero}, Sessão ${sessionRegister.id}`,
      },
    });

    return new NextResponse(newTicket.id.toString(), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
}

export async function DeleteTicket(itemID: number) {
  const ticketData = await prisma.ingressos.findFirst({
    where: { id: itemID },
    include: {
      assentos: {
        include: {
          salas: true,
        },
      },
      sessoes: true,
    },
  });
  if (!ticketData) {
    throw "Ingresso não existe";
  }

  await prisma.vendas.create({
    data: {
      horario_venda: new Date(),
      preco: (ticketData.preco?.toNumber() ?? 0) * -1,
      descricao: `Reembolso de ingresso - ${ticketData.sessoes.nome_do_filme} - Assento ${ticketData.assentos.codigo}, Bloco ${ticketData.assentos.salas.bloco} Sala ${ticketData.assentos.salas.bloco}, Sessão ${ticketData.sessoes.id}`,
    },
  });

  await prisma.ingressos.delete({
    where: {
      id: itemID,
    },
  });
}

export async function DELETE(request: NextRequest) {
  try {
    const itemID = request.headers.get("id");
    if (!itemID) {
      throw "id é obrigatório";
    }
    DeleteTicket(parseInt(itemID));
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
  return new NextResponse("Ingresso excluido", {
    status: 200,
  });
}
