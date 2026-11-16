import prisma from "../app/lib/prisma";

const newCategories = [
  {
    name: "Amino Acids & Biochemical Reagents",
    slug: "amino-acids-biochemical-reagents",
    description: "Amino acids and biochemical reagents",
    icon: "FaVial",
    color: "#2D2B7F",
  },
  {
    name: "Analytical Reference Standards",
    slug: "analytical-reference-standards",
    description: "Analytical reference standards",
    icon: "FaFlask",
    color: "#2D2B7F",
  },
  {
    name: "Environmental Contaminants",
    slug: "environmental-contaminants",
    description: "Environmental contaminants",
    icon: "FaLeaf",
    color: "#2D2B7F",
  },
  {
    name: "Food Additives & Contaminants",
    slug: "food-additives-contaminants",
    description: "Food additives and contaminants",
    icon: "FaUtensils",
    color: "#2D2B7F",
  },
  {
    name: "Pesticides & Agrochemicals",
    slug: "pesticides-agrochemicals",
    description: "Pesticides and agrochemicals",
    icon: "FaSprayCan",
    color: "#2D2B7F",
  },
  {
    name: "Standard Solutions",
    slug: "standard-solutions",
    description: "Standard solutions",
    icon: "FaGraduationCap",
    color: "#2D2B7F",
  },
  {
    name: "Veterinary Drugs",
    slug: "veterinary-drugs",
    description: "Veterinary drugs",
    icon: "FaPills",
    color: "#2D2B7F",
  },
  {
    name: "Vitamins & Nutritional Compounds",
    slug: "vitamins-nutritional-compounds",
    description: "Vitamins and nutritional compounds",
    icon: "FaAppleAlt",
    color: "#2D2B7F",
  },
];

async function main() {
  try {
    console.log("Deleting all existing categories...");
    await prisma.category.deleteMany({});
    console.log("Deleted all categories");

    console.log("Creating new categories...");
    for (const cat of newCategories) {
      await prisma.category.create({
        data: {
          ...cat,
          isActive: true,
          sortOrder: newCategories.indexOf(cat),
        },
      });
    }
    console.log(`Created ${newCategories.length} categories`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
