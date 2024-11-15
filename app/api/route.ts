import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const salas = await prisma.salas.findMany()
    return new NextResponse(JSON.stringify(salas), {
      status: 200,
    });
  }
  