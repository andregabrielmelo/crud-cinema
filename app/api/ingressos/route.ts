import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { BedDouble } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionID = request.headers.get("sessao");
  // Realiza uma query diferente baseando-se se a requisição possui o id da sessão ou nao
  // SELECT * FROM ingressos;
  // SELECT * FROM ingressos WHERE id_sessao = sessionID;
  const ingressos = await prisma.ingressos.findMany({
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
    console.log("Request: ");
    console.log(request);
    const bodyData: Prisma.$ingressosPayload["scalars"] = await request.json();
    console.log("Body data: ", bodyData);
    // SELECT s.* FROM sessoes s
    // JOIN salas sa ON s.sala_id = sa.id
    // WHERE s.id = bodyData.id_sessao
    // LIMIT 1;
    const sessionRegister = await prisma.sessoes.findFirst({
      where: { id: bodyData.id_sessao },
      include: {
        salas: true,
      },
    });

    // SELECT a.* from assentos a
    // JOIN salas sa ON a.id_sala = sa.id
    // WHERE a.id = bodyData.id_assento
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
      // SELECT count(*) from ingressos
      // where id_sessao = bodyData.id_sessao and
      //  id_assento = bodyData.id_assento;
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

    //  INSERT INTO ingressos (id_sessao, id_assento, preco, horario_venda) VALUES
    //  (bodyData.id_sessao, bodyData.id_assento, bodyData.preco, now())
    const newTicket = await prisma.ingressos.create({
      data: bodyData,
    });

    console.log(
      "Tamanho: " +
        `Venda de ingresso - ${sessionRegister.nome_do_filme} - Assento ${seatRegister.codigo}, Bloco ${seatRegister.salas.bloco} Sala ${seatRegister.salas.numero}, Sessão ${sessionRegister.id}`
          .length
    );

    // INSERT INTO vendas (preco, descricao, horario_venda) VALUES
    //  (bodyData.preco, CONCAT('Venda de ingresso - ',sessionRegister.nome_do_filme,' - Assento ', seatRegister.codigo,', Bloco ',seatRegister.salas.bloco,' Sala ',seatRegister.salas.numero,' Sessão ', sessionRegister.id), now())
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
    console.log(JSON.stringify(e));
    return new NextResponse("The error is: " + JSON.stringify(e), {
      status: 400,
    });
  }
}

export async function DeleteTicket(itemID: number) {
  // SELECT * from ingressos i
  // JOIN assentos a ON i.id_assento = a.id
  // JOIN salas sa on a.id_sala = sa.id
  // JOIN sessoes s on i.id_sessao = s.id
  // WHERE i.id = itemID
  // LIMIT 1;
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

  // INSERT INTO vendas (preco, descricao, horario_venda) VALUES
  //  (bodyData.preco * -1, CONCAT('Reembolso de ingresso - ',ticketData.sessoes.nome_do_filme,' - Assento ', ticketData.sessoes.codigo,', Bloco ',ticketData.sessoes.salas.bloco,' Sala ',ticketData.sessoes.salas.numero,' Sessão ', ticketData.sessoes.id), now())
  await prisma.vendas.create({
    data: {
      horario_venda: new Date(),
      preco: (ticketData.preco?.toNumber() ?? 0) * -1,
      descricao: `Reembolso de ingresso - ${ticketData.sessoes.nome_do_filme} - Assento ${ticketData.assentos.codigo}, Bloco ${ticketData.assentos.salas.bloco} Sala ${ticketData.assentos.salas.numero}, Sessão ${ticketData.sessoes.id}`,
    },
  });

  // DELETE from ingressos
  // WHERE id = itemID;
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
