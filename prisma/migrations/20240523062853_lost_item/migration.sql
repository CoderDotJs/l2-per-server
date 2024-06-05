-- CreateEnum
CREATE TYPE "lostItemStatus" AS ENUM ('LOST', 'FOUND');

-- CreateEnum
CREATE TYPE "lostItemCategory" AS ENUM ('Walet', 'Key', 'Mobail', 'Laptop', 'Bike', 'Car', 'Others');

-- CreateTable
CREATE TABLE "lostitems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" "lostItemStatus" NOT NULL,
    "category" "lostItemCategory" NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "lostitems_pkey" PRIMARY KEY ("id")
);
