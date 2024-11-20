import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Verifica se o cursor foi passado na requisição
  const cursor = request.headers.get("cursor");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }

  // Pega os assentos solicitados
  // É pego 20 assentos por vez
  // Pula os (cursor * 20) primeiros assentos
  const assentos = await prisma.assentos.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });

  // Retorna os assentos em formato JSON com status 200
  return new NextResponse(JSON.stringify(assentos), {
    status: 200,
    statusText: "OK",
  });
}

export async function DELETE(request: NextRequest) {
  const itemID = request.headers.get("id");

  // Verifica se o id foi passado na requisição
  if (!itemID) {
    return new NextResponse("O id é obrigatório, não pode ser: " + itemID, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  // Tenta deletar o assento com o id passado
  try {
    await prisma.assentos.delete({
      where: {
        id: parseInt(itemID),
      },
    });
  } catch (error) {
    return new NextResponse("Erro ao excluir o assento\n" + error, {
      status: 400,
      statusText: "Bad Request",
    });
  }
  return new NextResponse("assento excluido", {
    status: 200,
    statusText: "OK",
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
