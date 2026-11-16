import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Consumables | Sri Saradi Scientific",
  description: "Laboratory consumables for research labs in India: pipette tips, tubes, plates, filters and more. Request a quote from Sri Saradi Scientific, Hyderabad.",
  alternates: { canonical: "/lab-consumables" },
  openGraph: { title: "Lab Consumables | Sri Saradi Scientific", description: "Laboratory consumables for research labs in India: pipette tips, tubes, plates, filters and more. Request a quote from Sri Saradi Scientific, Hyderabad.", url: "/lab-consumables", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
