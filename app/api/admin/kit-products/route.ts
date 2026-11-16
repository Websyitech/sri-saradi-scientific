import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const items = await prisma.kitProduct.findMany({
      orderBy: { sortOrder: "asc" }
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch kit products" }, { status: 500 });
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { associatedProducts, ...productData } = await request.json();
    const slug = generateSlug(productData.title);
    
    const item = await prisma.kitProduct.create({
      data: {
        ...productData,
        slug,
        associatedProducts: associatedProducts && associatedProducts.length > 0
          ? associatedProducts
          : []
      }
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create kit product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, associatedProducts, ...productData } = await request.json();
    if (productData.title) {
      productData.slug = generateSlug(productData.title);
    }

    const item = await prisma.kitProduct.update({
      where: { id },
      data: {
        ...productData,
        associatedProducts: associatedProducts || []
      }
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update kit product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    await prisma.kitProduct.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete kit product" }, { status: 500 });
  }
}
