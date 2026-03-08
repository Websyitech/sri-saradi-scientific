import prisma from "@/app/lib/prisma";

async function main() {
  const allCategories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  console.log("📋 All categories in database:\n");
  allCategories.forEach((cat) => {
    console.log(`  ✓ ${cat.name}`);
    console.log(`    ID: ${cat.id}`);
    console.log(`    Slug: ${cat.slug}\n`);
  });

  console.log(`\nTotal: ${allCategories.length} categories`);

  const antibodies = await prisma.category.findFirst({
    where: { name: { equals: "Antibodies", mode: "insensitive" } },
  });

  if (antibodies) {
    console.log(`\n✅ Antibodies category EXISTS!`);
    console.log(`   ID: ${antibodies.id}`);
  } else {
    console.log(`\n❌ Antibodies category NOT FOUND`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
