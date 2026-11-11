import type { MetadataRoute } from "next";
import { POLICIES } from "./lib/policies";

const BASE = "https://srisaradiscientific.com";
const PATHS = ["/", "/about", "/services", "/omni-search", "/genomic", "/contact", "/terms-of-service", ...POLICIES.map((p) => `/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
