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

// Adaptação da função resetAndUpsertUnits
export async function resetAndUpsertUnits(units: IUnit[]): Promise<void> {
  // Primeiro, deletar todas as unidades
  await deleteAllUnits();

  // Agora, para cada unidade, criar um novo registro
  for (const unit of units) {
    const { omicronAbilities, ...unitData } = unit;

    // Criar a unidade no banco de dados e obter o ID da unidade recém-criada
    const createdUnit = await prisma.unit.create({
      data: unitData
    });

    // Se existirem habilidades omicron associadas, crie os registros correspondentes
    if (omicronAbilities && omicronAbilities.length > 0) {
      // Agora, use uma transação para inserir todas as habilidades omicron associadas de uma vez
      await prisma.$transaction(
        omicronAbilities.map(omicron => prisma.unitOmicronPlayers.create({
          data: {
            unitId: createdUnit.id,
            omicronId: omicron.omicronId,
            players: omicron.players
          }
        }))
      );
    }
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

// Adaptação da função getAllUnits
export async function getAllUnits(): Promise<IUnit[]> {
  const units = await prisma.unit.findMany({
    include: {
      omicronPlayers: true // Isso irá incluir as informações de UnitOmicronPlayers para cada Unit.
    }
  });

  return units.map(unit => ({
    ...unit,
    omicronAbilities: unit.omicronPlayers.map(omicronPlayer => ({
      omicronId: omicronPlayer.omicronId,
      players: omicronPlayer.players
    }))
  }));
}

// Função para consultar todos os navios
export async function getAllShips(): Promise<IShip[]> {
  return await prisma.ship.findMany();
}

// Adaptação da função getUnitByBaseId
export async function getUnitByBaseId(base_id: string): Promise<IUnit | null> {
  const unitData = await prisma.unit.findUnique({
    where: {
      base_id: base_id
    },
    include: {
      omicronPlayers: true // Correção do nome do relacionamento
    }
  });

  if (!unitData) return null;

  // Transformando os dados para se ajustar à interface IUnit
  return {
    ...unitData,
    omicronAbilities: unitData.omicronPlayers.map(omicronPlayer => ({
      omicronId: omicronPlayer.omicronId,
      players: omicronPlayer.players
    }))
  };
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

  // Primeiro, excluímos todas as unidades selecionadas existentes
  await deleteAllSelectedUnits();

  // Em seguida, adicionamos as novas unidades selecionadas
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