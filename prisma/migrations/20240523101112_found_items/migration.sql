-- CreateTable
CREATE TABLE "founditems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" "lostItemStatus" NOT NULL,
    "category" "lostItemCategory" NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uploadImage" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "founditems_pkey" PRIMARY KEY ("id")
);
