import type { Metadata } from "next";

const title = "Certificates & Quality Documents | Sri Saradi Scientific";
const description = "Company registrations, distributor authorisations and quality certificates of Sri Saradi Scientific Private Limited, Hyderabad.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/certificates" },
  openGraph: { title, description, url: "/certificates", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
