import { NextResponse } from "next/server";
import { SITE_SETTINGS } from "@/app/lib/siteSettings";

export function GET() {
  const offices = [
    {
      name: "Corporate Office",
      address: "319, VM Towers, 3rd Floor, Suchitra Rd, Green Park, Kompally, New Jeedimetla, Jeedimetla - Malkajgiri, Hyderabad, Telangana, 500067",
    },
  ];

  return NextResponse.json({
    id: null,
    title: "Contact Us",
    subtitle: "Get in touch with us",
    description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    email: SITE_SETTINGS.contact_email,
    phone: SITE_SETTINGS.contact_phone,
    offices: offices.map((office) => ({
      ...office,
      mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`,
    })),
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
    isActive: true,
  });
}
