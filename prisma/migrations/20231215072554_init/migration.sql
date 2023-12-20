/*
  Warnings:

  - You are about to drop the `Filecontent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Filecontent" DROP CONSTRAINT "Filecontent_fileId_fkey";

-- DropTable
DROP TABLE "Filecontent";
