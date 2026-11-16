import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    // Get settings
    const settingsArray = await prisma.siteSetting.findMany();
    const settings: Record<string, string> = {};
    settingsArray.forEach((s) => {
      settings[s.key] = s.value;
    });

    // Check if sitemap is enabled
    if (settings.sitemap_enabled === "false") {
      return new NextResponse("Sitemap disabled", { status: 404 });
    }

    const siteUrl = settings.site_url || "https://srisaradiscientific.com";
    const includeProducts = settings.sitemap_include_products !== "false";
    const changeFreq = settings.sitemap_change_freq || "weekly";
    const priority = settings.sitemap_priority || "0.8";

    if (!includeProducts) {
      return new NextResponse("Products not included in sitemap", { status: 404 });
    }

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // Add products for page 9 (skip 40000, take 5000)
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { catalogNumber: true, updatedAt: true },
      skip: 40000,
      take: 5000,
      orderBy: { catalogNumber: 'asc' }
    });

    for (const prod of products) {
      urls.push({
        loc: `${siteUrl}/product/${prod.catalogNumber}`,
        lastmod: prod.updatedAt.toISOString().split("T")[0],
        changefreq: changeFreq,
        priority: priority,
      });
    }

    if (urls.length === 0) {
      return new NextResponse("No products found", { status: 404 });
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Products sitemap error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}