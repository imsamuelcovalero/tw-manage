/* File: src/app/services/prismaUnitsService.ts */
import { PrismaClient } from '@prisma/client';
import { IUnit, IShip } from '../interfaces/types';

const prisma = new PrismaClient();

// Função para fazer upsert na tabela 'Unit'
export async function upsertUnit(unitData: IUnit): Promise<IUnit> {
  const existingUnit = await prisma.unit.findUnique({
    where: {
      base_id: unitData.base_id
    }
  });

  if (existingUnit) {
    return await prisma.unit.update({
      where: {
        id: existingUnit.id
      },
      data: unitData
    });
  } else {
    return await prisma.unit.create({
      data: unitData
    });
  }
}

// Função para fazer upsert na tabela 'Ship'
export async function upsertShip(shipData: IShip): Promise<IShip> {
  const existingShip = await prisma.ship.findUnique({
    where: {
      base_id: shipData.base_id
    }
  });

  if (existingShip) {
    return await prisma.ship.update({
      where: {
        id: existingShip.id
      },
      data: shipData
    });
  } else {
    return await prisma.ship.create({
      data: shipData
    });
  }
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

// Lembre-se de fechar a conexão do Prisma quando seu servidor for encerrado.
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});