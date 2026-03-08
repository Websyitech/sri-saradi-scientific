import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const pathway = await prisma.signalingPathway.findUnique({
      where: { id },
    });

    if (!pathway) {
      return NextResponse.json(
        { error: "Signaling pathway not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pathway);
  } catch (error) {
    console.error("Error fetching signaling pathway:", error);
    return NextResponse.json(
      { error: "Failed to fetch signaling pathway" },
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

    const pathway = await prisma.signalingPathway.update({
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

    return NextResponse.json(pathway);
  } catch (error) {
    console.error("Error updating signaling pathway:", error);
    return NextResponse.json(
      { error: "Failed to update signaling pathway" },
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
    await prisma.signalingPathway.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Signaling pathway deleted" });
  } catch (error) {
    console.error("Error deleting signaling pathway:", error);
    return NextResponse.json(
      { error: "Failed to delete signaling pathway" },
      { status: 500 }
    );
  }
}
