"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

// Floating WhatsApp button on every page. /genomic has its own (with a product-specific message);
// the US landing page has none (WhatsApp to an Indian number is not how US labs buy).
export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/genomic") || pathname?.startsWith("/admin") || pathname?.startsWith("/us-lab-filters")) return null;
  return (
    <a
      href="https://wa.me/917207607444?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20products"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
      title="Chat with our team on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
