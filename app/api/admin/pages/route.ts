import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();
    const page = await prisma.page.create({ data });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, ...data } = await request.json();
    const page = await prisma.page.update({ where: { id }, data });
    return NextResponse.json(page);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    await prisma.page.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
