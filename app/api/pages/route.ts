import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single page by slug
      const page = await prisma.page.findFirst({
        where: {
          slug: slug,
          isActive: true
        },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          content: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }

      return NextResponse.json(page);
    } else {
      // Get all published pages
      const pages = await prisma.page.findMany({
        where: {
          isActive: true
        },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      return NextResponse.json(pages);
    }
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}