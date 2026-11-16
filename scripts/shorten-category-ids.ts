import prisma from "../app/lib/prisma";

async function generateShortId(): Promise<string> {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

async function main() {
  try {
    console.log("🔄 Starting category ID shortening...\n");

    const idMap = new Map<string, string>();
    const allCategories = await prisma.category.findMany();

    console.log(`📊 Found ${allCategories.length} categories to migrate\n`);

    for (const cat of allCategories) {
      let shortId = "";
      let isUnique = false;

      while (!isUnique) {
        shortId = await generateShortId();
        isUnique = !idMap.has(shortId) && !allCategories.some((c) => idMap.get(c.id) === shortId);
      }

      idMap.set(cat.id, shortId);
      console.log(`📝 ${cat.name.padEnd(40)} ${cat.id.substring(0, 3)}...${cat.id.substring(cat.id.length - 4)} → ${shortId}`);
    }

    console.log("\n🔗 Creating temporary columns...");
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      ADD COLUMN id_new VARCHAR(12)
    `);
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      ADD COLUMN "parentId_new" VARCHAR(12)
    `);

    console.log("✅ Temporary columns created\n");

    console.log("🔄 Copying data to temporary columns...\n");

    for (const [oldId, newId] of idMap.entries()) {
      const category = allCategories.find((c) => c.id === oldId);
      if (category) {
        const newParentId = category.parentId ? idMap.get(category.parentId) : null;
        
        await prisma.$executeRawUnsafe(
          `UPDATE categories SET id_new = $1, "parentId_new" = $2 WHERE id = $3`,
          newId,
          newParentId,
          oldId
        );
      }
    }

    console.log("✅ Data copied\n");

    console.log("🔄 Updating products with new category IDs...\n");

    for (const [oldId, newId] of idMap.entries()) {
      await prisma.$executeRawUnsafe(
        `UPDATE products SET "categoryId" = $1 WHERE "categoryId" = $2`,
        newId,
        oldId
      );
    }

    console.log("✅ Products updated\n");

    console.log("🔗 Dropping old columns and renaming new ones...");
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      DROP CONSTRAINT "categories_pkey"
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      DROP COLUMN id
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      RENAME COLUMN id_new TO id
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      DROP COLUMN "parentId"
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      RENAME COLUMN "parentId_new" TO "parentId"
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE categories 
      ADD PRIMARY KEY (id)
    `);

    console.log("✅ Columns renamed and constraints restored\n");

    console.log("✨ ID shortening completed successfully!");
    console.log(`\n📋 Summary:`);
    console.log(`   • ${allCategories.length} categories updated`);
    console.log(`   • All parent-child relationships maintained`);
    console.log(`   • All product category references updated`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
