'use server';  // usando a funcionalidade 'Server Actions' do Next.js
/* File: src/app/actions/finalizeSelectionAction.tsx */
import { addSelectedUnits, resetAndUpsertUnits, resetAndUpsertShips } from '../services/prismaUnitsService';
import { ISelectedUnit, IUnit, IShip } from '../interfaces/types';
import validators from '@/app/api/middlewares/validators';

export async function finalizeSelectionAction(
  selectedUnits: ISelectedUnit[],
  unitsData: IUnit[],
  shipsData: IShip[]
) {
  // 1. Validar os dados de entrada
  validators.validateSelectedUnitsData(selectedUnits);
  validators.validateUnitsData(unitsData);
  validators.validateShipsData(shipsData);

  // 2. Gravar selectedUnits no banco de dados.
  await addSelectedUnits(selectedUnits);

  // 3. Realizar upsert nas tabelas de unidades e navios com os dados processados.
  await resetAndUpsertUnits(unitsData);
  await resetAndUpsertShips(shipsData);
}