/* File: src/app/services/dataProcessorService.ts */

import { IMember, ISelectedUnit, IUnit, IOmicronAbility, IShip } from "../interfaces/types";
import { fetchPlayerData } from "./playerService";

const UNIT_COMBAT_TYPE = 1;
const SHIP_COMBAT_TYPE = 2;

export function shipDataProcessorService(selectedShips: ISelectedUnit[], members: IMember[]): Promise<IShip[]> {
  const shipsData: IShip[] = initializeShipsData(selectedShips);

  return new Promise(async (resolve, reject) => {
    for (const member of members)
      try {
        const playerData = await fetchPlayerData(member.ally_code.toString());

        for (const unit of playerData.units) {
          if (selectedShips.some(sShip => sShip.base_id === unit.data.base_id)) {
            if (unit.data.combat_type === SHIP_COMBAT_TYPE) { // It's a SHIP
              const existingShip = shipsData.find(s => s.base_id === unit.data.base_id);
              if (existingShip) {
                existingShip.quantity += 1;
              }
            }
          }
        }
      } catch (error: any) {
        // Handle the error as appropriate for your application
        reject(error);
      }

    resolve(shipsData);
  });
}

function initializeShipsData(selectedShips: ISelectedUnit[]): IShip[] {
  return selectedShips.map(ship => ({
    base_id: ship.base_id,
    name: ship.name,
    quantity: 0
  }));
}

export function unitDataProcessorService(selectedUnits: ISelectedUnit[], members: IMember[]): Promise<IUnit[]> {
  const unitsData: IUnit[] = initializeUnitsData(selectedUnits);

  return new Promise(async (resolve, reject) => {
    for (const member of members)
      try {
        const playerData = await fetchPlayerData(member.ally_code.toString());

        for (const unit of playerData.units) {
          if (selectedUnits.some(sUnit => sUnit.base_id === unit.data.base_id)) {
            const existingUnit = unitsData.find(u => u.base_id === unit.data.base_id);

            if (unit.data.combat_type === UNIT_COMBAT_TYPE) { // It's a UNIT
              if (existingUnit) {
                existingUnit.quantity += 1;

                const omicronPlayers = unit.data.omicron_abilities;

                omicronPlayers.forEach((omicronId: string, index: number) => {
                  switch (index) {
                    case 0:
                      existingUnit.omicron_count_1 += 1;
                      updateOmicronPlayers(existingUnit, omicronId, member.player_name);
                      break;
                    case 1:
                      existingUnit.omicron_count_2 += 1;
                      updateOmicronPlayers(existingUnit, omicronId, member.player_name);
                      break;
                    case 2:
                      existingUnit.omicron_count_3 += 1;
                      updateOmicronPlayers(existingUnit, omicronId, member.player_name);
                      break;
                  }
                });
              }
            }
          }
        }
      } catch (error: any) {
        // Handle the error as appropriate for your application
        reject(error);
      }

    resolve(unitsData);
  });
}

function initializeUnitsData(selectedUnits: ISelectedUnit[]): IUnit[] {
  return selectedUnits.map(unit => ({
    base_id: unit.base_id,
    name: unit.name,
    quantity: 0,
    omicron_count_1: 0,
    omicron_count_2: 0,
    omicron_count_3: 0,
    omicron1Id: unit.omicron1Id,
    omicron2Id: unit.omicron2Id,
    omicron3Id: unit.omicron3Id,
    omicronPlayers: initializeOmicronPlayers(unit)
  }));
}

function initializeOmicronPlayers(unit: ISelectedUnit): IOmicronAbility[] {
  // console.log('unit', unit);

  const omicronPlayers: IOmicronAbility[] = [];

  if (unit.omicron1Id) {
    omicronPlayers.push({
      omicronId: unit.omicron1Id,
      players: []
    });
  }

  if (unit.omicron2Id) {
    omicronPlayers.push({
      omicronId: unit.omicron2Id,
      players: []
    });
  }

  if (unit.omicron3Id) {
    omicronPlayers.push({
      omicronId: unit.omicron3Id,
      players: []
    });
  }

  // console.log('omicronPlayers', omicronPlayers);

  return omicronPlayers;
}

function updateOmicronPlayers(unit: IUnit, omicronId: string, playerName: string) {
  // Encontre a habilidade omicron com base no ID fornecido
  const omicronAbility = unit.omicronPlayers?.find(omicron => omicron.omicronId === omicronId);

  // Se encontrarmos a habilidade Omicron e o nome do jogador ainda não estiver listado, adicionamos o nome
  if (omicronAbility && !omicronAbility.players.includes(playerName)) {
    omicronAbility.players.push(playerName);
  }
}