import type { MetadataRoute } from "next";

const BASE = "https://srisaradiscientific.com";
const PATHS = ["/", "/about", "/services", "/catalogue", "/omni-search", "/genomic", "/contact", "/terms-of-service", "/products", "/privacy-policy", "/terms-and-conditions", "/cancellation-policy", "/shipping-and-delivery-policy", "/return-policy", "/refund-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
