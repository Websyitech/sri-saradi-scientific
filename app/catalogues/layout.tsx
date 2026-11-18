import type { Metadata } from "next";

const title = "Catalogues & Product Brochures | Sri Saradi Scientific";
const description = "Download Solarbio and lab product catalogues and brochures from Sri Saradi Scientific: antibodies, ELISA kits, reagents and lab consumables.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/catalogues" },
  openGraph: { title, description, url: "/catalogues", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
