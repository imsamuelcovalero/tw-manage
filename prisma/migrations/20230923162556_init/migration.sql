-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "player_name" TEXT NOT NULL,
    "galactic_power" INTEGER,
    "ally_code" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_ally_code_key" ON "Member"("ally_code");
