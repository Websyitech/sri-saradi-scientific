import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { ARTICLES } from "@/app/guides/articles";
import { PAGES as FILTER_PAGES } from "@/app/filters/data";

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
    const includeCategories = settings.sitemap_include_categories !== "false";
    const changeFreq = settings.sitemap_change_freq || "weekly";

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];
    const today = new Date().toISOString().split("T")[0];

    // Add static pages
    const staticPages = [
      { path: "/", priority: "1.0" },
      { path: "/products", priority: "0.9" },
      { path: "/genomic", priority: "0.9" },
      { path: "/solarbio", priority: "0.9" },
      { path: "/guides", priority: "0.7" },
      ...ARTICLES.map((a) => ({ path: `/guides/${a.slug}`, priority: "0.7" })),
      { path: "/filters", priority: "0.8" },
      ...FILTER_PAGES.map((p) => ({ path: `/filters/${p.slug}`, priority: "0.8" })),
      { path: "/omni-search", priority: "0.8" },
      { path: "/services", priority: "0.8" },
      { path: "/lab-consumables", priority: "0.7" },
      { path: "/us-lab-filters", priority: "0.8" },
      { path: "/cro-services", priority: "0.7" },
      { path: "/catalogue", priority: "0.7" },
      { path: "/about", priority: "0.7" },
      { path: "/contact", priority: "0.7" },
      { path: "/faq", priority: "0.5" },
      { path: "/careers", priority: "0.5" },
      { path: "/privacy-policy", priority: "0.3" },
      { path: "/terms-and-conditions", priority: "0.3" },
      { path: "/cancellation-policy", priority: "0.3" },
      { path: "/shipping-and-delivery-policy", priority: "0.3" },
      { path: "/return-policy", priority: "0.3" },
      { path: "/refund-policy", priority: "0.3" },
    ];

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
        select: { slug: true, updatedAt: true, _count: { select: { products: { where: { isActive: true } } } } },
        orderBy: { slug: 'asc' }
      });

      // Categories with products are listed as /solarbio/<slug> below; empty or wrapper categories are noindex or
      // canonicalised there, so no /products?category= URL is listed.
      for (const cat of categories.filter(() => false)) {
        urls.push({
          loc: `${siteUrl}/products?category=${cat.slug}`,
          lastmod: cat.updatedAt.toISOString().split("T")[0],
          changefreq: changeFreq,
          priority: "0.7",
        });
      }
    }

    // Solarbio brand landing pages, one per category
    const { getBrandCategories } = await import("@/app/solarbio/brandData");
    for (const c of await getBrandCategories()) {
      urls.push({ loc: `${siteUrl}/solarbio/${c.slug}`, lastmod: today, changefreq: changeFreq, priority: "0.8" });
    }

    // CRO services and signaling pathways
    const [croServices, pathways] = await Promise.all([
      prisma.cROService.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.signalingPathway.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    ]);
    for (const item of [
      ...croServices.map((c) => ({ ...c, base: "/cro-services" })),
      ...pathways.map((p) => ({ ...p, base: "/signaling-pathways" })),
    ]) {
      urls.push({
        loc: `${siteUrl}${item.base}/${item.slug}`,
        lastmod: item.updatedAt.toISOString().split("T")[0],
        changefreq: changeFreq,
        priority: "0.6",
      });
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
    console.error("Main sitemap error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
