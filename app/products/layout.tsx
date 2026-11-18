import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Solarbio Reagents, Antibodies & ELISA Kits | Sri Saradi Scientific",
  description: "Browse 62,000+ Solarbio antibodies, ELISA kits, biochemicals and reagents for research in India, with GST quotations from Sri Saradi Scientific.",
  keywords: [
    "Solarbio products",
    "antibodies",
    "ELISA kits",
    "reagents",
    "biochemicals",
    "research products",
    "life sciences",
    "Solarbio reagents",
  ],
  openGraph: {
    title: "Products - Solarbio Reagents & Antibodies",
    description: "High-quality Solarbio Life Sciences products for research and diagnostics",
    type: "website",
    url: "/products",
    images: [{ url: "/assets/sri-saradi-logo.png", alt: "Sri Saradi Scientific" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solarbio Products",
    description: "Research reagents, antibodies, and ELISA kits from Solarbio Life Sciences",
  },
};

function LoadingFallback() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e0e0e0", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
        <div>Loading products...</div>
      </div>
    </div>
  );
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}
