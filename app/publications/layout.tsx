import type { Metadata } from "next";

const title = "Publications Citing Our Products | Sri Saradi Scientific";
const description = "Research papers from Indian labs that used reagents, antibodies and kits supplied by Sri Saradi Scientific, Hyderabad.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/publications" },
  openGraph: { title, description, url: "/publications", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
