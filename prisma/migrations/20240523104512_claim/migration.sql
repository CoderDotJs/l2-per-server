-- CreateTable
CREATE TABLE "claims" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "uploadImage" TEXT NOT NULL DEFAULT '',
    "lostTime" TEXT NOT NULL,

    CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);
