import prisma from "@/app/lib/prisma";

async function main() {
  const categoriesToCreate = [
    { name: "Antibodies", slug: "antibodies" },
  ];

  for (const cat of categoriesToCreate) {
    const existing = await prisma.category.findFirst({
      where: { name: { equals: cat.name, mode: "insensitive" } },
    });

    if (!existing) {
      const created = await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          isActive: true,
        },
      });
      console.log(`✅ Created category: ${created.name} (ID: ${created.id})`);
    } else {
      console.log(`✓ Category already exists: ${existing.name} (ID: ${existing.id})`);
    }
  }

  const allCategories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  console.log("\n📋 All categories in database:");
  allCategories.forEach((cat) => {
    console.log(`  • ${cat.name} (${cat.id})`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
