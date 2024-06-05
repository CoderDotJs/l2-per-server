/*
  Warnings:

  - Added the required column `petType` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetTypeData" AS ENUM ('dog', 'cat', 'cow', 'bird', 'others');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "petType" "PetTypeData" NOT NULL;
