import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    // First try to get contact page data
    const contactPage = await prisma.contactPage.findFirst();
    
    // Get contact info from site settings
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    
    // If contactPage exists, merge with settings
    if (contactPage) {
      return NextResponse.json({
        ...contactPage,
        email: contactPage.email || settingsMap.contact_email || "info@srisaradiscientific.com",
        phone: contactPage.phone || settingsMap.contact_phone || "+91 97424 43809",
        address: contactPage.address || settingsMap.contact_address || "Hyderabad, Telangana, India",
      });
    }
    
    // Return default data with settings values
    return NextResponse.json({
      id: null,
      title: "Contact Us",
      subtitle: "Get in touch with us",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      email: settingsMap.contact_email || "info@srisaradiscientific.com",
      phone: settingsMap.contact_phone || "+91 97424 43809",
      address: settingsMap.contact_address || "Hyderabad, Telangana, India",
      businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
      mapEmbedUrl: "",
      isActive: true,
    });
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return NextResponse.json({
      id: null,
      title: "Contact Us",
      subtitle: "Get in touch with us",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      email: "info@srisaradiscientific.com",
      phone: "+91 97424 43809",
      address: "Hyderabad, Telangana, India",
      businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
      mapEmbedUrl: "",
      isActive: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const existing = await prisma.contactPage.findFirst();
    
    if (existing) {
      const updated = await prisma.contactPage.update({
        where: { id: existing.id },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          description: body.description,
          email: body.email,
          phone: body.phone,
          address: body.address,
          businessHours: body.businessHours,
          mapEmbedUrl: body.mapEmbedUrl,
          isActive: body.isActive !== false,
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.contactPage.create({
        data: {
          title: body.title || "Contact Us",
          subtitle: body.subtitle || "Get in touch with us",
          description: body.description || "",
          email: body.email || "",
          phone: body.phone || "",
          address: body.address || "",
          businessHours: body.businessHours || "",
          mapEmbedUrl: body.mapEmbedUrl || "",
          isActive: body.isActive !== false,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Error saving contact page:", error);
    return NextResponse.json({ error: "Failed to save contact page" }, { status: 500 });
  }
}
