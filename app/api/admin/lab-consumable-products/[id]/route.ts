import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  try {
    const product = await prisma.labConsumableProduct.findUnique({
      where: { id },
      include: {
        category: { select: { name: true } },
        kitProduct: { select: { title: true } }
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}