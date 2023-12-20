/*
  Warnings:

  - You are about to drop the `FileContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FileContent" DROP CONSTRAINT "FileContent_filedId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageFileId" INTEGER;

-- DropTable
DROP TABLE "FileContent";

-- CreateTable
CREATE TABLE "Filecontent" (
    "id" SERIAL NOT NULL,
    "content" BYTEA NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "Filecontent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filecontent_fileId_key" ON "Filecontent"("fileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filecontent" ADD CONSTRAINT "Filecontent_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
