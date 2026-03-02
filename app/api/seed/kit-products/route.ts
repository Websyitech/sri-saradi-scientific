import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("Seeding kit products...");

    const kitProducts = [
      {
        title: "Filtration Solutions",
        slug: "filtration-solutions",
        heroTitle: "Advanced Filtration Solutions",
        description: "Comprehensive filtration consumables for laboratory applications.",
        image: "https://via.placeholder.com/400x300?text=Filtration",
        href: "/products?category=filtration",
        sortOrder: 1,
        isActive: true,
        associatedProducts: JSON.stringify([
          {
            productTitle: "Syringe Filter 0.22µm",
            categoryId: "filtration",
            image: "https://via.placeholder.com/200x200?text=Syringe+Filter",
            description: "High-quality syringe filters for sterilization and sample preparation",
            details: ["0.22µm pore size", "100pcs per pack", "Compatible with common syringes"]
          }
        ])
      },
      {
        title: "Liquid Handling",
        slug: "liquid-handling",
        heroTitle: "Precision Liquid Handling Equipment",
        description: "High-quality pipette tips and liquid handling consumables.",
        image: "https://via.placeholder.com/400x300?text=Liquid+Handling",
        href: "/products?category=liquid-handling",
        sortOrder: 2,
        isActive: true,
        associatedProducts: JSON.stringify([
          {
            productTitle: "Universal Pipette Tips 10µL",
            categoryId: "liquid-handling",
            image: "https://via.placeholder.com/200x200?text=Pipette+Tips",
            description: "Universal pipette tips compatible with most pipettes",
            details: ["10µL capacity", "1000pcs per bag", "Sterile and RNase/DNase free"]
          }
        ])
      },
      {
        title: "Sample Storage",
        slug: "sample-storage",
        heroTitle: "Secure Sample Storage Solutions",
        description: "Cryogenic vials and storage solutions for sample preservation.",
        image: "https://via.placeholder.com/400x300?text=Sample+Storage",
        href: "/products?category=storage",
        sortOrder: 3,
        isActive: true,
        associatedProducts: JSON.stringify([
          {
            productTitle: "Cryogenic Vials 2.0mL",
            categoryId: "storage",
            image: "https://via.placeholder.com/200x200?text=Cryo+Vials",
            description: "Low-temperature storage vials",
            details: ["-196°C to +90°C range", "Leak-proof design", "500pcs per bag"]
          }
        ])
      }
    ];

    let createdCount = 0;
    for (const product of kitProducts) {
      try {
        const data: any = {
          title: product.title,
          description: product.description,
          image: product.image,
          href: product.href,
          sortOrder: product.sortOrder,
          isActive: product.isActive,
        };

        await prisma.kitProduct.create({ data });
        createdCount++;
        console.log(`Created: ${product.title}`);
      } catch (error) {
        console.error(`Error creating ${product.title}:`, error);
      }
    }

    return NextResponse.json({ 
      message: `Seeded ${createdCount} kit products`,
      count: createdCount 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
