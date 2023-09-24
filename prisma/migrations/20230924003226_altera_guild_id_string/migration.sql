/*
  Warnings:

  - You are about to drop the column `omicron` on the `Unit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[base_id]` on the table `Ship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[base_id]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `base_id` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_id` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `omicron_count_1` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `omicron_count_2` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `omicron_count_3` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BackupMember" ALTER COLUMN "guildId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "guildId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "base_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "omicron",
ADD COLUMN     "base_id" TEXT NOT NULL,
ADD COLUMN     "omicron_count_1" INTEGER NOT NULL,
ADD COLUMN     "omicron_count_2" INTEGER NOT NULL,
ADD COLUMN     "omicron_count_3" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ship_base_id_key" ON "Ship"("base_id");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_base_id_key" ON "Unit"("base_id");
