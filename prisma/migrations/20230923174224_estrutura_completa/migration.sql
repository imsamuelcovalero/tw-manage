/*
  Warnings:

  - Added the required column `guildId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Made the column `galactic_power` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "guildId" INTEGER NOT NULL,
ALTER COLUMN "galactic_power" SET NOT NULL;

-- CreateTable
CREATE TABLE "BackupMember" (
    "id" SERIAL NOT NULL,
    "player_name" TEXT NOT NULL,
    "galactic_power" INTEGER NOT NULL,
    "ally_code" INTEGER NOT NULL,
    "guildId" INTEGER,

    CONSTRAINT "BackupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "omicron" BOOLEAN NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BackupMember_ally_code_key" ON "BackupMember"("ally_code");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_url_key" ON "Guild"("url");
