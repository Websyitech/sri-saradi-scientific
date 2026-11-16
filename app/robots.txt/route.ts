import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const robotsSetting = await prisma.siteSetting.findFirst({
      where: { key: "robots_txt" },
    });

    const defaultRobots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://srisaradiscientific.com/sitemap.xml`;

    const content = robotsSetting?.value || defaultRobots;

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch {
    return new NextResponse(
      `User-agent: *
Allow: /`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}
