import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const catalogues = await prisma.catalogue.findMany({
      where: {
        isActive: true,
      },
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