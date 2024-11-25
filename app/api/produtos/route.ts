import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cursor = request.headers.get("cursor");
  if (!cursor) {
    return new NextResponse("cursor é obrigatório", {
      status: 400,
    });
  }
  // SELECT * FROM produtos LIMIT cursor * 20, 20;
  // Teste: SELECT * FROM produtos LIMIT 0, 20;
  const produtos = await prisma.produtos.findMany({
    skip: parseInt(cursor) * 20,
    take: 20,
  });
  return new NextResponse(JSON.stringify(produtos), {
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
    // DELETE FROM produtos WHERE id = itemID;
    // Teste: DELETE FROM produtos WHERE id = 1;
    await prisma.produtos.delete({
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
    const bodyData: Prisma.$produtosPayload["scalars"] = await request.json();
    if (
      // SELECT COUNT(*) FROM produtos WHERE nome = bodyData.nome;
      // Teste: SELECT COUNT(*) FROM produtos WHERE nome = "Candy";
      await prisma.produtos.count({
        where: {
          nome: bodyData.nome,
        },
      })
    ) {
      throw "Este produto ja está listado";
    }
    // INSERT INTO produtos (nome, preco) VALUES (bodyData.nome, bodyData.preco)
    // Teste: INSERT INTO produtos (nome, preco) VALUES ("Bala", 3);
    const newSeat = await prisma.produtos.create({
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
    const bodyData: Prisma.$produtosPayload["scalars"] = await request.json();
    const itemID = request.headers.get("id");
    if (!itemID) {
      return new NextResponse("id é obrigatório", {
        status: 400,
      });
    }
    // UPDATE produtos SET nome = bodyData.nome, produto = bodyData.produto WHERE id = itemID;
    // Teste: UPDATE produtos SET nome = "Balita", preco = 5 WHERE id = 7;
    const editedItem = await prisma.produtos.update({
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
