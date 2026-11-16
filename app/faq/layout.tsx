import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Sri Saradi Scientific",
  description: "Answers to common questions about ordering, quotations, delivery, payments and product support at Sri Saradi Scientific.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "Frequently Asked Questions | Sri Saradi Scientific", description: "Answers to common questions about ordering, quotations, delivery, payments and product support at Sri Saradi Scientific.", url: "/faq", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
