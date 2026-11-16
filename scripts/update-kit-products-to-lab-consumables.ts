import prisma from "../app/lib/prisma";

async function updateKitProductsToLabConsumables() {
  try {
    console.log("🔍 Checking current kit products...");
    
    // First, let's see what we have
    const currentKitProducts = await prisma.kitProduct.findMany({
      select: { id: true, title: true, slug: true, heroTitle: true }
    });
    
    console.log(`Found ${currentKitProducts.length} kit products:`);
    currentKitProducts.forEach(product => {
      console.log(`  - ${product.title} (${product.slug})`);
      if (product.heroTitle) {
        console.log(`    Hero title: ${product.heroTitle}`);
      }
    });
    
    console.log("\n🔄 Updating titles containing 'Kit Products' to 'Lab Consumables'...");
    
    let updatedCount = 0;
    
    for (const product of currentKitProducts) {
      const updates: any = {};
      
      // Update title if it contains "Kit Products"
      if (product.title && product.title.includes("Kit Products")) {
        updates.title = product.title.replace(/Kit Products/g, "Lab Consumables");
        console.log(`  Title: "${product.title}" → "${updates.title}"`);
      }
      
      // Update heroTitle if it contains "Kit Products"  
      if (product.heroTitle && product.heroTitle.includes("Kit Products")) {
        updates.heroTitle = product.heroTitle.replace(/Kit Products/g, "Lab Consumables");
        console.log(`  Hero Title: "${product.heroTitle}" → "${updates.heroTitle}"`);
      }
      
      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        await prisma.kitProduct.update({
          where: { id: product.id },
          data: updates
        });
        updatedCount++;
        console.log(`  ✅ Updated product: ${product.id}`);
      }
    }
    
    console.log(`\n✨ Successfully updated ${updatedCount} kit product records`);
    
    // Show final results
    console.log("\n📋 Final results:");
    const finalKitProducts = await prisma.kitProduct.findMany({
      select: { id: true, title: true, slug: true, heroTitle: true }
    });
    
    finalKitProducts.forEach(product => {
      console.log(`  - ${product.title} (${product.slug})`);
      if (product.heroTitle) {
        console.log(`    Hero title: ${product.heroTitle}`);
      }
    });
    
  } catch (error) {
    console.error("❌ Error updating kit products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateKitProductsToLabConsumables();