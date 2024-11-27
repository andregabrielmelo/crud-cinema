import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DeleteTicket } from "../ingressos/route";

export async function GET(request: NextRequest) {
  const movie = request.headers.get("movie");
  // SELECT * FROM sessoes WHERE nome_do_filme LIKE "%movie%";
  // Teste: SELECT * FROM sessoes WHERE nome_do_filme LIKE "%movie%";
  const sessoes = await prisma.sessoes.findMany({
    ...(movie
      ? {
          where: {
            nome_do_filme: {
              contains: movie,
            },
          },
        }
      : {}),
  });
  return new NextResponse(JSON.stringify(sessoes), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  try {
    const bodyData: Prisma.$sessoesPayload["scalars"] = await request.json();
    bodyData.horario_inicial = new Date(bodyData.horario_inicial);
    bodyData.horario_final = new Date(bodyData.horario_final);
    if (bodyData.horario_inicial >= bodyData.horario_final) {
      throw "O final da sessão deve ser após o inicio";
    }
    if (bodyData.horario_inicial < new Date()) {
      throw "A sessão deve ser iniciada no futuro";
    }
    // SELECT COUNT(*) FROM salas WHERE id = bodyData.id_sala;
    // Teste: SELECT COUNT(*) FROM salas WHERE id = 1;
    const salaExists = await prisma.salas.count({
      where: {
        id: bodyData.id_sala,
      },
    });
    if (!salaExists) {
      throw "Sala não existente";
    }

    if (
      await checkRoomavailability(
        bodyData.id_sala,
        bodyData.horario_inicial,
        bodyData.horario_final
      )
    ) {
      throw "Este horario já está sendo utilizado nesta sala";
    }

    // INSERT INTO sessoes (nome_do_filme, horario_inicial, horario_final, id_sala)
    // VALUES (bodyData.nome_do_filme, bodyData.horario_inicial, bodyData.horario_final, bodyData.id_sala);

    // Teste:
    // INSERT INTO sessoes (nome_do_filme, horario_inicial, horario_final, id_sala)
    // VALUES ("teste", '2024-11-24 11:00:00', '2024-11-24 12:00:00', 1);

    const newSession = await prisma.sessoes.create({
      data: bodyData,
    });

    return new NextResponse(newSession.id.toString(), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const itemID = request.headers.get("id");
    if (!itemID) {
      return new NextResponse("id é obrigatório", {
        status: 400,
      });
    }
    // SELECT s.*
    // FROM sessoes s
    // JOIN ingressos i ON s.id = i.id_sessao
    // WHERE s.id = itemID;

    // Teste:
    // SELECT s.*
    // FROM sessoes s
    // JOIN ingressos i ON s.id = i.id_sessao
    // WHERE s.id = 1;
    const session = await prisma.sessoes.findFirst({
      where: {
        id: parseInt(itemID),
      },
      include: {
        ingressos: true,
      },
    });
    if ((session?.horario_inicial.getTime() ?? 0) > Date.now()) {
      session?.ingressos.forEach((item) => {
        DeleteTicket(item.id);
      });
    }
    // DELETE FROM sessoes WHERE id = itemID;
    // Teste: DELETE FROM sessoes WHERE id = 1;
    // Cannot delete or update a parent row: a foreign key constraint fails (`cinema`.`ingressos`,
    // CONSTRAINT `ingressos_ibfk_1` FOREIGN KEY (`id_sessao`) REFERENCES `sessoes` (`id`))
    await prisma.sessoes.delete({
      where: {
        id: parseInt(itemID),
      },
    });
    return new NextResponse("registro excluido", {
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
    const bodyData: Prisma.$sessoesPayload["scalars"] = await request.json();
    const itemID = request.headers.get("id");
    if (!itemID) {
      throw "id é obrigatório";
    } else if (
      // SELECT COUNT(*) FROM sessoes WHERE id = itemID;
      // Teste: SELECT COUNT(*) FROM sessoes WHERE id = 1;
      !(await prisma.sessoes.count({ where: { id: parseInt(itemID) } }))
    ) {
      throw "sessão não existente";
    }

    bodyData.horario_final = new Date(bodyData.horario_final);
    bodyData.horario_inicial = new Date(bodyData.horario_inicial);
    if (
      await checkRoomavailability(
        bodyData.id_sala,
        bodyData.horario_inicial,
        bodyData.horario_final,
        parseInt(itemID)
      )
    ) {
      throw "Este horario já está sendo utilizado nesta sala";
    }
    // UPDATE sessoes
    // SET nome_do_filme = bodyData.nome_do_filme,
    // horario_inicial = bodyData.horario_inicial,
    // horario_final = bodyData.horario_final,
    // id_sala = bodyData.id_sala WHERE id = itemID;

    // Teste:
    // UPDATE sessoes
    // SET nome_do_filme = "teste",
    //     horario_inicial = '2024-11-24 11:00:00',
    //     horario_final = '2024-11-24 12:00:00',
    //     id_sala = 1
    // WHERE id = 1;

    const editedItem = await prisma.sessoes.update({
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

async function checkRoomavailability(
  id_sala: number,
  horario_inicial: Date,
  horario_final: Date,
  id_sessao?: number
) {
  // SELECT COUNT(*) FROM sessoes WHERE id_sala = id_sala AND ( horario_inicial <= horario_inicial AND horario_final >= horario_inicial OR horario_inicial <= horario_final AND horario_final >= horario_final OR horario_inicial >= horario_inicial AND horario_inicial <= horario_final);
  // SELECT COUNT(*) AS count
  // FROM sessoes
  // WHERE id_sala = ? -- Replace with `id_sala`
  //   AND (
  //     -- First condition: `horario_inicial` <= `horario_inicial` AND `horario_final` >= `horario_inicial`
  //     (horario_inicial <= ? AND horario_final >= ?)

  //     -- Second condition: `horario_inicial` <= `horario_final` AND `horario_final` >= `horario_final`
  //     OR (horario_inicial <= ? AND horario_final >= ?)

  //     -- Third condition: `horario_inicial` BETWEEN `horario_inicial` AND `horario_final`
  //     OR (horario_inicial >= ? AND horario_inicial <= ?)
  //   )
  //   -- Optional exclusion: `id` != `id_sessao`
  //   AND (? IS NULL OR id != ?);

  // Teste:
  // SELECT COUNT(*) AS count
  // FROM sessoes
  // WHERE id_sala = 1
  //   AND (
  //         -- Condition 1
  //         (horario_inicial <= '2024-11-24 11:30:00' AND horario_final >= '2024-11-24 11:30:00')
  //         -- Condition 2
  //         OR (horario_inicial <= '2024-11-24 12:30:00' AND horario_final >= '2024-11-24 12:30:00')
  //         -- Condition 3
  //         OR (horario_inicial >= '2024-11-24 11:30:00' AND horario_inicial <= '2024-11-24 12:30:00')
  //       );

  return await prisma.sessoes.count({
    where: {
      id_sala: id_sala,
      OR: [
        {
          horario_inicial: {
            lte: horario_inicial,
          },
          horario_final: {
            gte: horario_inicial,
          },
        },
        {
          horario_inicial: {
            lte: horario_final,
          },
          horario_final: {
            gte: horario_final,
          },
        },
        {
          AND: [
            {
              horario_inicial: {
                gte: horario_inicial,
              },
            },
            {
              horario_inicial: {
                lte: horario_final,
              },
            },
          ],
        },
      ],
      ...(id_sessao
        ? {
            NOT: {
              id: id_sessao,
            },
          }
        : {}),
    },
  });
}
