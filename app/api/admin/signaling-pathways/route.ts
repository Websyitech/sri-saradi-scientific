import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const pathways = await prisma.signalingPathway.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(pathways);
  } catch (error) {
    console.error("Error fetching signaling pathways:", error);
    return NextResponse.json(
      { error: "Failed to fetch signaling pathways" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, heading, subheading, banner, content, isActive, sortOrder } = body;

    const pathway = await prisma.signalingPathway.create({
      data: {
        slug,
        title,
        heading,
        subheading,
        banner,
        content,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(pathway, { status: 201 });
  } catch (error) {
    console.error("Error creating signaling pathway:", error);
    return NextResponse.json(
      { error: "Failed to create signaling pathway" },
      { status: 500 }
    );
  }
}
