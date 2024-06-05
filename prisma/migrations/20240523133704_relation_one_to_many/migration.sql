/*
  Warnings:

  - Added the required column `userId` to the `claims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `founditems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `lostitems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_description_fkey";

-- DropForeignKey
ALTER TABLE "founditems" DROP CONSTRAINT "founditems_email_fkey";

-- DropForeignKey
ALTER TABLE "lostitems" DROP CONSTRAINT "lostitems_email_fkey";

-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "founditems" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lostitems" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lostitems" ADD CONSTRAINT "lostitems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "founditems" ADD CONSTRAINT "founditems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
