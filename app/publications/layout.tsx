import type { Metadata } from "next";

const title = "Research Publications | Sri Saradi Scientific";
const description = "Research papers and publications in life sciences, listed by Sri Saradi Scientific, Hyderabad, supplier of reagents, antibodies and kits in India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/publications" },
  openGraph: { title, description, url: "/publications", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
