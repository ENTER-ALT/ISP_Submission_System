/*
  Warnings:

  - The values [STUDENT,ADMINISTRATIVE] on the enum `UserTypes` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[startYear,studentId]` on the table `Isp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserTypes_new" AS ENUM ('Student', 'Administrative');
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserTypes_new" USING ("userType"::text::"UserTypes_new");
ALTER TYPE "UserTypes" RENAME TO "UserTypes_old";
ALTER TYPE "UserTypes_new" RENAME TO "UserTypes";
DROP TYPE "UserTypes_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Isp_startYear_studentId_key" ON "Isp"("startYear", "studentId");
