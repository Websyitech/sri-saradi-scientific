import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Sri Saradi Scientific",
  description: "Join Sri Saradi Scientific in Hyderabad. See current openings in scientific sales, product support and operations.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers | Sri Saradi Scientific", description: "Join Sri Saradi Scientific in Hyderabad. See current openings in scientific sales, product support and operations.", url: "/careers", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
