import prisma from "@/app/lib/prisma";

async function main() {
  try {
    console.log("Seeding kit products...");

    const kitProducts = [
      {
        title: "Filtration Solutions",
        slug: "filtration-solutions",
        heroTitle: "Advanced Filtration Solutions",
        description: "Comprehensive filtration consumables for laboratory applications including syringe filters, membrane filters, and filtration systems.",
        image: "https://via.placeholder.com/400x300?text=Filtration",
        href: "/products?category=filtration",
        sortOrder: 1,
        isActive: true,
        associatedProducts: [
          {
            productTitle: "Syringe Filter 0.22µm",
            categoryId: "filtration",
            image: "https://via.placeholder.com/200x200?text=Syringe+Filter",
            description: "High-quality syringe filters for sterilization and sample preparation",
            details: ["0.22µm pore size", "100pcs per pack", "Compatible with common syringes"]
          },
          {
            productTitle: "Membrane Filter Discs",
            categoryId: "filtration",
            image: "https://via.placeholder.com/200x200?text=Membrane+Filter",
            description: "Membrane filters for various laboratory applications",
            details: ["47mm diameter", "0.45µm pore size", "Nylon material", "50 filters per box"]
          }
        ]
      },
      {
        title: "Liquid Handling",
        slug: "liquid-handling",
        heroTitle: "Precision Liquid Handling Equipment",
        description: "High-quality pipette tips, micro-tubes, and liquid handling consumables for accurate sample preparation.",
        image: "https://via.placeholder.com/400x300?text=Liquid+Handling",
        href: "/products?category=liquid-handling",
        sortOrder: 2,
        isActive: true,
        associatedProducts: [
          {
            productTitle: "Universal Pipette Tips 10µL",
            categoryId: "liquid-handling",
            image: "https://via.placeholder.com/200x200?text=Pipette+Tips",
            description: "Universal pipette tips compatible with most pipettes",
            details: ["10µL capacity", "1000pcs per bag", "Sterile and RNase/DNase free"]
          },
          {
            productTitle: "Automated Pipette Tips",
            categoryId: "liquid-handling",
            image: "https://via.placeholder.com/200x200?text=Auto+Tips",
            description: "Automated pipetting system consumables",
            details: ["Compatible with major platforms", "384pcs per box", "Multiple volume options available"]
          }
        ]
      },
      {
        title: "Sample Storage",
        slug: "sample-storage",
        heroTitle: "Secure Sample Storage Solutions",
        description: "Cryogenic vials, centrifuge tubes, and storage solutions for long-term sample preservation.",
        image: "https://via.placeholder.com/400x300?text=Sample+Storage",
        href: "/products?category=storage",
        sortOrder: 3,
        isActive: true,
        associatedProducts: [
          {
            productTitle: "Cryogenic Vials 2.0mL",
            categoryId: "storage",
            image: "https://via.placeholder.com/200x200?text=Cryo+Vials",
            description: "Low-temperature storage vials",
            details: ["2.0mL capacity", "-196°C to +90°C range", "Leak-proof design", "500pcs per bag"]
          },
          {
            productTitle: "Microcentrifuge Tubes 1.5mL",
            categoryId: "storage",
            image: "https://via.placeholder.com/200x200?text=Micro+Tubes",
            description: "Standard microcentrifuge tubes for sample storage",
            details: ["1.5mL capacity", "Graduated markings", "1000pcs per bag", "Autoclavable"]
          }
        ]
      },
      {
        title: "PCR & Molecular",
        slug: "pcr-molecular",
        heroTitle: "PCR and Molecular Biology Consumables",
        description: "PCR plates, tubes, and molecular biology reagents for DNA/RNA analysis.",
        image: "https://via.placeholder.com/400x300?text=PCR+Molecular",
        href: "/products?category=molecular",
        sortOrder: 4,
        isActive: true,
        associatedProducts: [
          {
            productTitle: "PCR Plates 96-well",
            categoryId: "molecular",
            image: "https://via.placeholder.com/200x200?text=PCR+Plate",
            description: "High-quality PCR plates for amplification",
            details: ["96-well format", "0.1mL per well", "Full skirt design", "50pcs per pack"]
          },
          {
            productTitle: "PCR Tubes 0.2mL",
            categoryId: "molecular",
            image: "https://via.placeholder.com/200x200?text=PCR+Tube",
            description: "Individual PCR tubes for reactions",
            details: ["0.2mL capacity", "1000pcs per bag", "Flat cap", "Autoclavable"]
          }
        ]
      }
    ];

    for (const product of kitProducts) {
      const existing = await prisma.kitProduct.findFirst({
        where: { title: product.title },
      });

      if (existing) {
        console.log(`✓ Kit product "${product.title}" already exists, skipping`);
        continue;
      }

      const { slug: _, ...dataWithoutSlug } = product as any;
      const created = await prisma.kitProduct.create({
        data: dataWithoutSlug,
      });

      console.log(`✓ Created kit product: ${created.title}`);
    }

    console.log("\n✓ Kit products seeded successfully!");
  } catch (error) {
    console.error("Error seeding kit products:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
