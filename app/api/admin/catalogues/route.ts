import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const catalogues = await prisma.catalogue.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(catalogues);
  } catch (error) {
    console.error("Error fetching catalogues:", error);
    return NextResponse.json(
      { error: "Failed to fetch catalogues" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, coverImage, pdfUrl, isActive, sortOrder } = body;

    const catalogue = await prisma.catalogue.create({
      data: {
        title,
        description,
        coverImage,
        pdfUrl,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(catalogue, { status: 201 });
  } catch (error) {
    console.error("Error creating catalogue:", error);
    return NextResponse.json(
      { error: "Failed to create catalogue" },
      { status: 500 }
    );
  }
}