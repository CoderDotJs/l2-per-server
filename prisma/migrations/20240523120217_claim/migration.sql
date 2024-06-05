-- CreateEnum
CREATE TYPE "claimStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "status" "claimStatus" NOT NULL DEFAULT 'pending';
