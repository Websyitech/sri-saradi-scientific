const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSlugs() {
  const products = await prisma.kitProduct.findMany();
  
  for (const product of products) {
    const slug = product.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    console.log(`Updating: ${product.title} -> ${slug}`);
    
    try {
      await prisma.kitProduct.update({
        where: { id: product.id },
        data: { slug }
      });
      console.log(`✓ Updated`);
    } catch (e) {
      console.error(`✗ Failed:`, e.message);
    }
  }
  
  await prisma.$disconnect();
}

updateSlugs().catch(console.error);
