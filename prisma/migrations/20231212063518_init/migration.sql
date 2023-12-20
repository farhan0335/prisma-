/*
  Warnings:

  - You are about to drop the column `profilepicture` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilepictureId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilepicture",
ADD COLUMN     "profilepictureId" INTEGER;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profilepictureId_key" ON "User"("profilepictureId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilepictureId_fkey" FOREIGN KEY ("profilepictureId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
