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
      },
    ];

    for (const product of kitProducts) {
      const existing = await prisma.kitProduct.findFirst({
        where: { title: product.title },
      });

      if (existing) {
        console.log(`✓ Kit product "${product.title}" already exists`);
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
