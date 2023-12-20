/*
  Warnings:

  - You are about to drop the `Filecontent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Filecontent" DROP CONSTRAINT "Filecontent_filedId_fkey";

-- DropTable
DROP TABLE "Filecontent";

-- CreateTable
CREATE TABLE "FileContent" (
    "id" SERIAL NOT NULL,
    "content" BYTEA NOT NULL,
    "filedId" INTEGER NOT NULL,

    CONSTRAINT "FileContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileContent_filedId_key" ON "FileContent"("filedId");

-- AddForeignKey
ALTER TABLE "FileContent" ADD CONSTRAINT "FileContent_filedId_fkey" FOREIGN KEY ("filedId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
