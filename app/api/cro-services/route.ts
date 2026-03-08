import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const service = await prisma.cROService.findUnique({
        where: { slug },
      });

      if (!service) {
        return NextResponse.json(
          { error: "Service not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(service);
    }

    const services = await prisma.cROService.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching CRO services:", error);
    return NextResponse.json(
      { error: "Failed to fetch CRO services" },
      { status: 500 }
    );
  }
}
