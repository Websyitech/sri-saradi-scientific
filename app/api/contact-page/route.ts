import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const contactPage = await prisma.contactPage.findFirst();
    
    if (!contactPage) {
      return NextResponse.json({
        id: null,
        title: "Contact Us",
        subtitle: "Get in touch with us",
        description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        email: "contact@srisaradiscientific.com",
        phone: "+91-XXXXXXXXXX",
        address: "Your Address Here",
        businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
        mapEmbedUrl: "",
        isActive: true,
      });
    }

    return NextResponse.json(contactPage);
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return NextResponse.json({
      id: null,
      title: "Contact Us",
      subtitle: "Get in touch with us",
      description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      email: "contact@srisaradiscientific.com",
      phone: "+91-XXXXXXXXXX",
      address: "Your Address Here",
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
