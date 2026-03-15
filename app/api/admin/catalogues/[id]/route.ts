import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const catalogue = await prisma.catalogue.findUnique({
      where: { id },
    });

    if (!catalogue) {
      return NextResponse.json(
        { error: "Catalogue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(catalogue);
  } catch (error) {
    console.error("Error fetching catalogue:", error);
    return NextResponse.json(
      { error: "Failed to fetch catalogue" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, description, coverImage, pdfUrl, isActive, sortOrder } = body;

    const catalogue = await prisma.catalogue.update({
      where: { id },
      data: {
        title,
        description,
        coverImage,
        pdfUrl,
        isActive,
        sortOrder,
      },
    });

    return NextResponse.json(catalogue);
  } catch (error) {
    console.error("Error updating catalogue:", error);
    return NextResponse.json(
      { error: "Failed to update catalogue" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.catalogue.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Catalogue deleted" });
  } catch (error) {
    console.error("Error deleting catalogue:", error);
    return NextResponse.json(
      { error: "Failed to delete catalogue" },
      { status: 500 }
    );
  }
}