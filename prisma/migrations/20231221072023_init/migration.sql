/*
  Warnings:

  - You are about to drop the column `fileId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_fileId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "fileId";

-- CreateTable
CREATE TABLE "_FileToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FileToPost_AB_unique" ON "_FileToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToPost_B_index" ON "_FileToPost"("B");

-- AddForeignKey
ALTER TABLE "_FileToPost" ADD CONSTRAINT "_FileToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToPost" ADD CONSTRAINT "_FileToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
