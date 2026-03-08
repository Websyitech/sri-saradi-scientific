import prisma from "../app/lib/prisma";

async function main() {
  try {
    console.log("Starting category reorganization...");

    const solarbioId = "cmm9psve80000wmnyyzacb6kd";

    const productLines = [
      {
        name: "Immunology & Detection",
        slug: "immunology-and-detection",
        icon: "FaSyringe",
        color: "#7B1FA2",
        children: [
          "cmm9psvf80004wmnygggygtq6", // Antibodies
          "cmm9psvfs0009wmnyobzidlsh", // ELISA Kits
          "cmm9psvgq000iwmnyzqpx0qml", // Protein & Immunity
          "cmm9psvgf000fwmnyh1lvgnxi", // Peptides
        ],
      },
      {
        name: "Cell Research & Culture",
        slug: "cell-research-and-culture",
        icon: "FaAtom",
        color: "#E65100",
        children: [
          "cmm9psvfl0007wmnyxs93n2xb", // Cell Biology
          "cmm9psvfp0008wmny9ekel0r7", // Cell Culture Media
        ],
      },
      {
        name: "Molecular & Biochemical Tools",
        slug: "molecular-and-biochemical-tools",
        icon: "GiMolecule",
        color: "#2E7D32",
        children: [
          "cmm9psvg9000dwmny8jjtjgmf", // Molecular Biology
          "cmm9psvfh0006wmnyvvizrdh9", // Biochemical Reagents
          "cmm9psveo0001wmnyy3xzm1ra", // Amino Acids & Biochemical Reagents
          "cmm9psvfd0005wmnyxkashurn", // Biochemical Assay Kits
        ],
      },
      {
        name: "Analytical & Reference Standards",
        slug: "analytical-and-reference-standards",
        icon: "FaMicroscope",
        color: "#6D4C41",
        children: [
          "cmm9psvew0002wmnyveorw263", // Analytical Reference Standards (General)
          "cmm9psvgu000jwmnyutitr8tx", // Standard Solutions
          "cmm9psvfv000awmnyyj9dqhq5", // Environmental Contaminants
          "cmm9psvfz000bwmnyikurzsuj", // Food Additives & Contaminants
          "cmm9psvgj000gwmny5l8rtw31", // Pesticides & Agrochemicals
          "cmm9psvh1000lwmnyl5hot9o2", // Veterinary Drugs
        ],
      },
      {
        name: "Histology & Staining",
        slug: "histology-and-staining",
        icon: "FaPalette",
        color: "#6A1B9A",
        children: [
          "cmm9psvg2000cwmnyktftup75", // Histological Staining
        ],
      },
      {
        name: "Support & Specialty",
        slug: "support-and-specialty",
        icon: "FaCapsules",
        color: "#C62828",
        children: [
          "cmm9psvf10003wmny03lpm5d1", // Antibiotics & Antimicrobials
          "cmm9psvgc000ewmnyxqj6td4r", // Natural Products & Phytochemicals
          "cmm9psvgn000hwmnye17mrnbk", // Pharmaceutical APIs & Metabolites
          "cmm9psvgx000kwmnymxf5x9y4", // Steroids & Hormones
          "cmm9psvh4000mwmny14rrczi9", // Vitamins & Nutritional Compounds
        ],
      },
    ];

    for (const productLine of productLines) {
      console.log(`\nCreating Product Line: ${productLine.name}`);

      const createdProductLine = await prisma.category.create({
        data: {
          name: productLine.name,
          slug: productLine.slug,
          description: `Product line: ${productLine.name}`,
          icon: productLine.icon,
          color: productLine.color,
          sortOrder: productLines.indexOf(productLine),
          isActive: true,
          parentId: solarbioId,
        },
      });

      console.log(`✓ Created: ${createdProductLine.name} (ID: ${createdProductLine.id})`);

      for (const childId of productLine.children) {
        const updated = await prisma.category.update({
          where: { id: childId },
          data: { parentId: createdProductLine.id },
        });
        console.log(`  ✓ Updated: ${updated.name} → parent: ${createdProductLine.name}`);
      }
    }

    console.log("\n✅ Category reorganization completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
