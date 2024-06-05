/*
  Warnings:

  - Added the required column `upodatedAt` to the `claims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upodatedAt` to the `founditems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upodatedAt` to the `lostitems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upodatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "founditems" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upodatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lostitems" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upodatedAt" TIMESTAMP(3) NOT NULL;
