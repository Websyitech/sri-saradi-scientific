import { NextResponse } from "next/server";
import { SITE_SETTINGS } from "@/app/lib/siteSettings";

export function GET() {
  return NextResponse.json({
    id: null,
    title: "Contact Us",
    subtitle: "Get in touch with us",
    description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    email: SITE_SETTINGS.contact_email,
    phone: SITE_SETTINGS.contact_phone,
    address: SITE_SETTINGS.contact_address,
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
    mapEmbedUrl: "",
    isActive: true,
  });
}
