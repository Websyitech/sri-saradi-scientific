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
        image: "https://via.placeholder.com/400x300?text=orient-filtr-products",
        href: "/products?category=orient-filtr-products",
        sortOrder: 1,
        isActive: true,
        associatedProducts: JSON.stringify([
          {
            productTitle: "Syringe Filter 0.22µm",
            categoryId: "orient-filtr-products",
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
      },
      {
        title: "PCR Consumables",
        slug: "pcr-consumables",
        heroTitle: "PCR & Molecular Biology Consumables",
        description: "Complete range of PCR plates, tubes, and molecular biology supplies including Molecular Series, Immunoassay Series, and Sealing Series products.",
        image: "https://via.placeholder.com/400x300?text=PCR+Consumables",
        href: "/kit-products/pcr-consumables",
        sortOrder: 4,
        isActive: true,
        associatedProducts: JSON.stringify([
          {
            productTitle: "PCR Plates 0.2mL 96-well",
            categoryId: "molecular",
            image: "https://via.placeholder.com/200x200?text=PCR+Plates",
            description: "Standard PCR plates for qPCR and conventional PCR applications",
            details: ["0.2mL capacity", "96-well format", "Full skirt available", "ABI compatible"]
          }
        ])
      }
    ];

    let createdCount = 0;
    for (const product of kitProducts) {
      try {
        const data: any = {
          title: product.title,
          slug: product.slug,
          heroTitle: product.heroTitle,
          description: product.description,
          image: product.image,
          href: product.href,
          sortOrder: product.sortOrder,
          isActive: product.isActive,
          associatedProducts: product.associatedProducts,
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
