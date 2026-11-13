import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Sri Saradi Scientific",
  description: "Terms governing the use of the Sri Saradi Scientific website and services.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: { title: "Terms of Service | Sri Saradi Scientific", description: "Terms governing the use of the Sri Saradi Scientific website and services.", url: "/terms-of-service", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
