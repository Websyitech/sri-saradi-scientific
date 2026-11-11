import type { MetadataRoute } from "next";

const BASE = "https://srisaradiscientific.com";
const PATHS = ["/", "/about", "/services", "/omni-search", "/genomic", "/contact", "/terms-of-service"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
