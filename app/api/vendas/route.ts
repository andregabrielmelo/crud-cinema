import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type newProduct = Prisma.$produtosPayload["scalars"] & {
  quantidade?: number;
};

export async function GET(request: NextRequest) {
  // SELECT * FROM vendas;
  const vendas = await prisma.vendas.findMany({});
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
    // DELETE FROM vendas WHERE id = itemID;
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
    // New Date() é como o NOW() do SQL
    // INSERT INTO vendas (descricao, preco, horario_venda) VALUES (bodyData.descricao, bodyData.preco, NOW());
    const newSale = await prisma.vendas.create({
      data: {
        descricao: `Produto - ${bodyData.quantidade ?? 1} ${bodyData.nome}`,
        preco:
          parseFloat(bodyData.preco.toString()) * (bodyData.quantidade ?? 1),
        horario_venda: new Date(),
      },
    });

    return new NextResponse(JSON.stringify(newSale), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse("Erro: " + JSON.stringify(e), {
      status: 400,
    });
  }
}
