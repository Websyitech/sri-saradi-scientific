const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reorder() {
  try {
    // Find Solarbio parent
    const solarbio = await prisma.category.findFirst({
      where: { slug: 'solarbio' }
    });

    if (!solarbio) {
      console.log('Solarbio not found');
      process.exit(1);
    }

    // Find Analytical Standards
    const analyticalStandards = await prisma.category.findFirst({
      where: { slug: 'analytical-standards', parentId: solarbio.id }
    });

    if (!analyticalStandards) {
      console.log('Analytical Standards not found');
      process.exit(1);
    }

    // Get all children of Solarbio sorted by current sort order
    const allChildren = await prisma.category.findMany({
      where: { parentId: solarbio.id },
      orderBy: { sortOrder: 'asc' }
    });

    // Create new sort order with Analytical Standards first
    let newSortOrder = 0;
    for (const child of allChildren) {
      if (child.id === analyticalStandards.id) {
        await prisma.category.update({
          where: { id: child.id },
          data: { sortOrder: 0 }
        });
        newSortOrder = 1;
      } else {
        await prisma.category.update({
          where: { id: child.id },
          data: { sortOrder: newSortOrder }
        });
        newSortOrder++;
      }
    }

    console.log('Reordered successfully - Analytical Standards is now first');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

reorder();
