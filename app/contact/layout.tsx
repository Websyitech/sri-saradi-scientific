import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sri Saradi Scientific",
  description: "Contact Sri Saradi Scientific in Hyderabad for product enquiries, quotations and sourcing support. Call +91 97424 43809 or email info@srisaradiscientific.com.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Us | Sri Saradi Scientific", description: "Contact Sri Saradi Scientific in Hyderabad for product enquiries, quotations and sourcing support. Call +91 97424 43809 or email info@srisaradiscientific.com.", url: "/contact", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
