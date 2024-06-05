/*
  Warnings:

  - Added the required column `additionalInfo` to the `Adoption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adoption" ADD COLUMN     "additionalInfo" TEXT NOT NULL;
