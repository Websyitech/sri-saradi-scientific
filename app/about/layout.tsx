import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Sri Saradi Scientific",
  description: "Sri Saradi Scientific is a scientist-led supplier in Hyderabad, sourcing research reagents, kits and laboratory equipment for labs, industry and dealers across India.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Us | Sri Saradi Scientific", description: "Sri Saradi Scientific is a scientist-led supplier in Hyderabad, sourcing research reagents, kits and laboratory equipment for labs, industry and dealers across India.", url: "/about", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
