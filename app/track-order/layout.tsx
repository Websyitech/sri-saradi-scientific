import type { Metadata } from "next";

const title = "Track Your Order | Sri Saradi Scientific";
const description = "Check the status of your Sri Saradi Scientific order using your order ID.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/track-order" },
  robots: { index: false, follow: true },
  openGraph: { title, description, url: "/track-order", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
