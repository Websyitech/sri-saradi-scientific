import prisma from "./app/lib/prisma";

async function cleanup() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE categories DROP COLUMN IF EXISTS id_new`);
    await prisma.$executeRawUnsafe(`ALTER TABLE categories DROP COLUMN IF EXISTS "parentId_new"`);
    console.log("✅ Cleaned up temporary columns");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
