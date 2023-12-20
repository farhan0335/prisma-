/*
  Warnings:

  - Added the required column `profilepicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilepicture" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
