/*
  Warnings:

  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `profilepictureId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profilepictureId_fkey";

-- DropIndex
DROP INDEX "User_profilepictureId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "mimetype",
DROP COLUMN "path";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilepictureId";

-- CreateTable
CREATE TABLE "Filecontent" (
    "id" SERIAL NOT NULL,
    "content" BYTEA NOT NULL,
    "filedId" INTEGER NOT NULL,

    CONSTRAINT "Filecontent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filecontent_filedId_key" ON "Filecontent"("filedId");

-- AddForeignKey
ALTER TABLE "Filecontent" ADD CONSTRAINT "Filecontent_filedId_fkey" FOREIGN KEY ("filedId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
