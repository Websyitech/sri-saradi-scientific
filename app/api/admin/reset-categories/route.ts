import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

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

export async function POST(request: NextRequest) {
  try {
    console.log("Deleting all existing categories...");
    await prisma.category.deleteMany({});
    console.log("Deleted all categories");

    console.log("Creating new categories...");
    for (let i = 0; i < newCategories.length; i++) {
      const cat = newCategories[i];
      await prisma.category.create({
        data: {
          ...cat,
          isActive: true,
          sortOrder: i,
        },
      });
    }
    console.log(`Created ${newCategories.length} categories`);

    return NextResponse.json({
      success: true,
      message: `Deleted old categories and created ${newCategories.length} new ones`,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reset categories" },
      { status: 500 }
    );
  }
}
