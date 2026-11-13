import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: "Custom Biologics & Discovery Services | Sri Saradi Scientific",
  description:
    "Custom synthesis, labeling, protein expression and Omni-Search discovery services with a clear scope, agreed quality data and a realistic delivery plan.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
