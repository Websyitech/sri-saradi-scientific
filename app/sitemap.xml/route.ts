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
    const includeCategories = settings.sitemap_include_categories !== "false";
    const changeFreq = settings.sitemap_change_freq || "weekly";
    const priority = settings.sitemap_priority || "0.8";

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // Add static pages
    const staticPages = [
      { path: "/", priority: "1.0" },
      { path: "/products", priority: "0.9" },
      { path: "/about", priority: "0.7" },
      { path: "/contact", priority: "0.7" },
      { path: "/careers", priority: "0.6" },
      { path: "/quote", priority: "0.6" },
    ];

    const today = new Date().toISOString().split("T")[0];

    for (const page of staticPages) {
      urls.push({
        loc: `${siteUrl}${page.path}`,
        lastmod: today,
        changefreq: changeFreq,
        priority: page.priority,
      });
    }

    // Add categories
    if (includeCategories) {
      const categories = await prisma.category.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      });

      for (const cat of categories) {
        urls.push({
          loc: `${siteUrl}/products?category=${cat.slug}`,
          lastmod: cat.updatedAt.toISOString().split("T")[0],
          changefreq: changeFreq,
          priority: "0.7",
        });
      }
    }

    // Add products (limit to prevent huge sitemaps)
    if (includeProducts) {
      const products = await prisma.product.findMany({
        where: { isActive: true },
        select: { catalogNumber: true, updatedAt: true },
        take: 50000, // Sitemap limit
      });

      for (const prod of products) {
        urls.push({
          loc: `${siteUrl}/product/${prod.catalogNumber}`,
          lastmod: prod.updatedAt.toISOString().split("T")[0],
          changefreq: changeFreq,
          priority: priority,
        });
      }
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
    console.error("Sitemap error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
