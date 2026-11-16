import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const service = await prisma.cROService.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { error: "CRO service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching CRO service:", error);
    return NextResponse.json(
      { error: "Failed to fetch CRO service" },
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
    const { slug, title, heading, subheading, banner, content, isActive, sortOrder } = body;

    const service = await prisma.cROService.update({
      where: { id },
      data: {
        slug,
        title,
        heading,
        subheading,
        banner,
        content,
        isActive,
        sortOrder,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating CRO service:", error);
    return NextResponse.json(
      { error: "Failed to update CRO service" },
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
    await prisma.cROService.delete({
      where: { id },
    });

    return NextResponse.json({ message: "CRO service deleted" });
  } catch (error) {
    console.error("Error deleting CRO service:", error);
    return NextResponse.json(
      { error: "Failed to delete CRO service" },
      { status: 500 }
    );
  }
}
