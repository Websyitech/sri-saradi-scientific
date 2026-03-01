import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Public API - no auth required
// Returns site settings for frontend use

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();

    // Convert to key-value object
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json(settingsMap);
  } catch {
    // Return defaults on error
    return NextResponse.json({
      site_name: "Sri Saradi Scientific",
      site_tagline: "Your Trusted Partner in Scientific Excellence",
      site_logo: "",
      site_favicon: "",
      site_url: "https://srisaradiscientific.com",
      seo_title: "Sri Saradi Scientific - Scientific Research Products",
      seo_description: "Leading supplier of scientific research products including antibodies, ELISA kits, biochemical reagents, and lab equipment.",
      seo_keywords: "scientific products, antibodies, ELISA kits, lab equipment",
      seo_og_image: "",
    });
  }
}
