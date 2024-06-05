/*
  Warnings:

  - Added the required column `email` to the `lostitems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lostitems" ADD COLUMN     "email" TEXT NOT NULL;
