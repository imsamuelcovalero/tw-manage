/* File: src/app/services/prismaUnitsService.ts */
import { PrismaClient } from '@prisma/client';
import { IUnit, IShip, ISelectedUnit } from '../interfaces/types';

const prisma = new PrismaClient();

export async function deleteAllUnits(): Promise<void> {
  await prisma.unit.deleteMany();
}

export async function deleteAllShips(): Promise<void> {
  await prisma.ship.deleteMany();
}

export async function resetAndUpsertUnits(units: IUnit[]): Promise<void> {
  await deleteAllUnits();
  for (const unit of units) {
    await prisma.unit.create({
      data: unit
    });
  }
}

export async function resetAndUpsertShips(ships: IShip[]): Promise<void> {
  await deleteAllShips();
  for (const ship of ships) {
    await prisma.ship.create({
      data: ship
    });
  }
}

export async function updateUnitRealData(unitData: IUnit): Promise<IUnit> {
  return await prisma.unit.update({
    where: {
      base_id: unitData.base_id
    },
    data: unitData
  });
}

export async function updateShipRealData(shipData: IShip): Promise<IShip> {
  return await prisma.ship.update({
    where: {
      base_id: shipData.base_id
    },
    data: shipData
  });
}

// Função para consultar todas as unidades
export async function getAllUnits(): Promise<IUnit[]> {
  return await prisma.unit.findMany();
}

// Função para consultar todos os navios
export async function getAllShips(): Promise<IShip[]> {
  return await prisma.ship.findMany();
}

// Função para consultar uma unidade pelo base_id
export async function getUnitByBaseId(base_id: string): Promise<IUnit | null> {
  return await prisma.unit.findUnique({
    where: {
      base_id: base_id
    }
  });
}

// Função para consultar um navio pelo base_id
export async function getShipByBaseId(base_id: string): Promise<IShip | null> {
  return await prisma.ship.findUnique({
    where: {
      base_id: base_id
    }
  });
}

/* Seção de funções para gerenciar as unidades selecionadas */

// Função para adicionar unidades selecionadas (suporta adição única e múltipla)
export async function addSelectedUnits(units: ISelectedUnit[] | ISelectedUnit): Promise<void> {
  const unitsArray = Array.isArray(units) ? units : [units];

  await prisma.selectedUnit.createMany({
    data: unitsArray.map(unit => ({
      base_id: unit.base_id,
      name: unit.name,
      type: unit.type
    }))
  });
}

// Função para recuperar todas as unidades selecionadas
export async function getAllSelectedUnits(): Promise<ISelectedUnit[]> {
  return await prisma.selectedUnit.findMany();
}

// Função para excluir unidades selecionadas (suporta remoção única e múltipla)
export async function deleteSelectedUnits(base_ids: string[] | string): Promise<void> {
  const baseIdsArray = Array.isArray(base_ids) ? base_ids : [base_ids];

  await prisma.selectedUnit.deleteMany({
    where: {
      base_id: {
        in: baseIdsArray
      }
    }
  });
}

// Função para excluir todas as unidades selecionadas
export async function deleteAllSelectedUnits(): Promise<void> {
  await prisma.selectedUnit.deleteMany();
}

// Lembre-se de fechar a conexão do Prisma quando seu servidor for encerrado.
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});