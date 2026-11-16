import prisma from "../app/lib/prisma";

async function main() {
  try {
    console.log("Starting ID shortening...");

    const generateShortId = (): string => {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < 12; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };

    const idMap = new Map<string, string>();

    const allCategories = await prisma.category.findMany();
    
    console.log(`Found ${allCategories.length} categories to migrate`);

    for (const cat of allCategories) {
      const shortId = generateShortId();
      idMap.set(cat.id, shortId);
      console.log(`${cat.name}: ${cat.id} → ${shortId}`);
    }

    for (const [oldId, newId] of idMap.entries()) {
      const category = await prisma.category.findUnique({ where: { id: oldId } });
      
      if (category) {
        const newParentId = category.parentId ? idMap.get(category.parentId) : null;
        
        await prisma.category.update({
          where: { id: oldId },
          data: {
            id: newId,
            parentId: newParentId,
          },
        });

        console.log(`✓ Updated: ${category.name} (${oldId} → ${newId})`);
      }
    }

    console.log("\n✅ ID shortening completed!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
