/*
  Warnings:

  - Changed the type of `omicron` on the `Unit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "omicron",
ADD COLUMN     "omicron" INTEGER NOT NULL;
