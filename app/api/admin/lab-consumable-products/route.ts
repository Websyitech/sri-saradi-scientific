import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const products = await prisma.labConsumableProduct.findMany({
      include: {
        category: { select: { name: true } },
        kitProduct: { select: { title: true } }
      },
      orderBy: { sortOrder: "asc" }
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to fetch lab consumable products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();
    
    const product = await prisma.labConsumableProduct.create({
      data: {
        title: data.title,
        subheading: data.subheading,
        content: data.content,
        image: data.image,
        categoryId: data.categoryId || null,
        kitProductId: data.kitProductId || null,
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive !== undefined ? data.isActive : true
      },
      include: {
        category: { select: { name: true } },
        kitProduct: { select: { title: true } }
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create lab consumable product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, ...data } = await request.json();

    const product = await prisma.labConsumableProduct.update({
      where: { id },
      data: {
        title: data.title,
        subheading: data.subheading,
        content: data.content,
        image: data.image,
        categoryId: data.categoryId || null,
        kitProductId: data.kitProductId || null,
        sortOrder: data.sortOrder || 0,
        isActive: data.isActive !== undefined ? data.isActive : true
      },
      include: {
        category: { select: { name: true } },
        kitProduct: { select: { title: true } }
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lab consumable product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    await prisma.labConsumableProduct.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete lab consumable product" }, { status: 500 });
  }
}