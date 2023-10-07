-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('UNIT', 'SHIP');

-- CreateTable
CREATE TABLE "SelectedUnit" (
    "id" SERIAL NOT NULL,
    "base_id" TEXT NOT NULL,
    "type" "UnitType" NOT NULL,

    CONSTRAINT "SelectedUnit_pkey" PRIMARY KEY ("id")
);
