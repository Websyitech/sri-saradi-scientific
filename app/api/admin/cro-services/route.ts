import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const services = await prisma.cROService.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, heading, subheading, banner, content, isActive, sortOrder } = body;

    const service = await prisma.cROService.create({
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

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating CRO service:", error);
    return NextResponse.json(
      { error: "Failed to create CRO service" },
      { status: 500 }
    );
  }
}
