import type { Metadata } from "next";

const title = "Solarbio Product Applications | Sri Saradi Scientific";
const description = "Research applications of Solarbio antibodies, ELISA kits, reagents and kits, with product suggestions for labs in India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/applications" },
  openGraph: { title, description, url: "/applications", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
