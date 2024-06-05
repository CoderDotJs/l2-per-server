-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('SUPPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateTable
CREATE TABLE "users" (
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "userRole" NOT NULL,
    "status" "userStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upodatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userName")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
