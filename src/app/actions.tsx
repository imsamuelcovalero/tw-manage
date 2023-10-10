'use server';  // usando a funcionalidade 'Server Actions' do Next.js
/* File: src/app/actions.tsx */
import { addSelectedUnits, resetAndUpsertUnits, resetAndUpsertShips } from './services/prismaUnitsService';
import { ISelectedUnit, IUnit, IShip } from './interfaces/types';

export async function finalizeSelectionAction(localSelectedUnits: ISelectedUnit[]) {
  // 1. Gravar localSelectedUnits no banco de dados.
  await addSelectedUnits(localSelectedUnits);

  // 2. Realizar upsert nas tabelas de unidades.
  function convertToIUnit(selectedUnit: ISelectedUnit): IUnit {
    return {
      base_id: selectedUnit.base_id,
      name: selectedUnit.name,
      quantity: 0, // valor padrão ou você pode pegar de alguma fonte
      omicron_count_1: 0, // valor padrão
      omicron_count_2: 0, // valor padrão
      omicron_count_3: 0  // valor padrão
    };
  }

  function convertToIShip(selectedUnit: ISelectedUnit): IShip {
    return {
      base_id: selectedUnit.base_id,
      name: selectedUnit.name,
      quantity: 0 // valor padrão ou você pode pegar de alguma fonte
    };
  }

  const unitsToUpsert: IUnit[] = [];
  const shipsToUpsert: IShip[] = [];

  for (const unit of localSelectedUnits) {
    if (unit.type === 'UNIT') {
      unitsToUpsert.push(convertToIUnit(unit));
    } else {
      shipsToUpsert.push(convertToIShip(unit));
    }
  }

  await resetAndUpsertUnits(unitsToUpsert);
  await resetAndUpsertShips(shipsToUpsert);
}