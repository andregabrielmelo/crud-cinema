import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type newProduct =
  Prisma.$produtosPayload["scalars"] & {
    quantidade?: number
  }


export async function GET(request: NextRequest) {
  const cursor = request.headers.get("cursor");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }
  const vendas = await prisma.vendas.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });
  return new NextResponse(JSON.stringify(vendas), {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const itemID = request.headers.get("id");
  if (!itemID) {
    return new NextResponse("id é obrigatório", {
      status: 400,
    });
  }
  try {
    await prisma.vendas.delete({
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
  try {
    const bodyData: newProduct = await request.json();
    const newSale = await prisma.vendas.create({
      data:
      {
        descricao: `Produto - ${bodyData.quantidade ?? 1} ${bodyData.nome}`,
        preco: parseFloat(bodyData.preco.toString()) * (bodyData.quantidade ?? 1),
        horario_venda: new Date()
      }
    })

    return new NextResponse(JSON.stringify(newSale), {
      status: 200
    })
  } catch (e) {
    return new NextResponse("Erro: " + JSON.stringify(e), {
      status: 400,
    });
  }
}
