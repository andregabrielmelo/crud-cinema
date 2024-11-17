import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type productsList = Array<
  Prisma.$produtosPayload["scalars"] & {
    quantidade?: number;
  }
>;

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
    let bodyData: productsList | productsItem = await request.json();

    // Garantir que bodyData seja sempre um array
    if (!Array.isArray(bodyData)) {
      bodyData = [bodyData];
    }

    // const newSales = await prisma.vendas.createMany({
    //   data: bodyData.map((item) => ({
    //     descricao: `Produto - ${item.quantidade || 1} ${item.nome}`,
    //     preco: parseFloat(item.preco.toString()) * (item.quantidade ?? 1),
    //     horario_venda: new Date(),
    //   })),
    // });

    const newSales = await prisma.vendas.createMany({
      data: bodyData.map((item) => ({
        descricao: item.descricao,
        preco: parseFloat(item.preco.toString()) * (item.quantidade ?? 1),
        horario_venda: new Date(),
      })),
    });

    return new NextResponse(newSales.count.toString(), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse("Erro ao incluir o registro", {
      status: 400,
    });
  }
}
