/*
  Warnings:

  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `name` on the `Privilege` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_ispId_fkey";

-- AlterTable
ALTER TABLE "Privilege" DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "studyYear" INTEGER,
ALTER COLUMN "nationality" DROP NOT NULL;

-- DropTable
DROP TABLE "Invoice";
