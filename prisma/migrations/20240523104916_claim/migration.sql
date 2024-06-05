/*
  Warnings:

  - You are about to drop the column `lostTime` on the `claims` table. All the data in the column will be lost.
  - Added the required column `lostDate` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" DROP COLUMN "lostTime",
ADD COLUMN     "lostDate" TEXT NOT NULL;
