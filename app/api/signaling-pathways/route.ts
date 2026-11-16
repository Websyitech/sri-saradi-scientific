import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const pathway = await prisma.signalingPathway.findUnique({
        where: { slug },
      });

      if (!pathway) {
        return NextResponse.json(
          { error: "Pathway not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(pathway);
    }

    const pathways = await prisma.signalingPathway.findMany({
      where: { isActive: true },
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
