/*
  Warnings:

  - A unique constraint covering the columns `[base_id]` on the table `SelectedUnit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SelectedUnit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SelectedUnit" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SelectedUnit_base_id_key" ON "SelectedUnit"("base_id");
