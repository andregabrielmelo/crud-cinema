import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const salas = await prisma.salas.findMany()
    return new NextResponse(JSON.stringify(salas), {
      status: 200,
    });
  }
  