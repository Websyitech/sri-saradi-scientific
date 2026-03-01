-- AlterTable
ALTER TABLE "solarbio_categories" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "solarbio_categories" ADD CONSTRAINT "solarbio_categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "solarbio_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
