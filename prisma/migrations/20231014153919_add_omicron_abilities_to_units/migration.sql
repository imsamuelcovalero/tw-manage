-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "omicron1Id" TEXT,
ADD COLUMN     "omicron2Id" TEXT,
ADD COLUMN     "omicron3Id" TEXT;

-- CreateTable
CREATE TABLE "UnitOmicronPlayers" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "omicronId" TEXT NOT NULL,
    "players" TEXT[],

    CONSTRAINT "UnitOmicronPlayers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnitOmicronPlayers" ADD CONSTRAINT "UnitOmicronPlayers_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
