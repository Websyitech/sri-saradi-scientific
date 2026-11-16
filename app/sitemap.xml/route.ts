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

    // Generate sitemap index XML
    const today = new Date().toISOString().split("T")[0];
    const sitemapEntries = [];

    // Always include main sitemap (static pages + categories)
    sitemapEntries.push(`  <sitemap>
    <loc>${siteUrl}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`);

    // Add product sitemaps if products are included
    if (includeProducts) {
      const productCount = await prisma.product.count({
        where: { isActive: true }
      });

      const productsPerSitemap = 5000;
      const numberOfProductSitemaps = Math.ceil(productCount / productsPerSitemap);

      // Only include sitemaps that will have content (max 10 sitemaps)
      for (let i = 1; i <= Math.min(numberOfProductSitemaps, 10); i++) {
        // Check if this sitemap would have any products
        const productsInThisSitemap = Math.min(5000, productCount - (i - 1) * 5000);
        if (productsInThisSitemap > 0) {
          sitemapEntries.push(`  <sitemap>
    <loc>${siteUrl}/sitemap-products-${i}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`);
        }
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap index error:", error);
    return new NextResponse("Error generating sitemap index", { status: 500 });
  }
}