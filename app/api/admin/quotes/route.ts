import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const quotes = await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    console.log("Admin quotes fetched:", { count: quotes.length, filter: status });
    return NextResponse.json(quotes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, ...data } = await request.json();
    const quote = await prisma.quoteRequest.update({
      where: { id },
      data,
      include: { items: true },
    });
    return NextResponse.json(quote);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    await prisma.quoteRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 });
  }
}
