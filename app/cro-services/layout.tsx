import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRO Services | Sri Saradi Scientific",
  description: "Contract research services from Sri Saradi Scientific: protein expression, peptide synthesis, primer synthesis and custom research support for labs in India.",
  alternates: { canonical: "/cro-services" },
  openGraph: { title: "CRO Services | Sri Saradi Scientific", description: "Contract research services from Sri Saradi Scientific: protein expression, peptide synthesis, primer synthesis and custom research support for labs in India.", url: "/cro-services", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
