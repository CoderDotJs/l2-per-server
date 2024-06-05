/*
  Warnings:

  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "size" "AnimalSize" NOT NULL,
ADD COLUMN     "specialNeeds" BOOLEAN NOT NULL DEFAULT false;
