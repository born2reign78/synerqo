-- CreateEnum
CREATE TYPE "ModuleInstallState" AS ENUM ('NOT_INSTALLED', 'INSTALLED', 'ENABLED', 'DISABLED');

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "state" "ModuleInstallState" NOT NULL DEFAULT 'NOT_INSTALLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);
