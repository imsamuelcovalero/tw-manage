'use server';  // usando a funcionalidade 'Server Actions' do Next.js
/* File: src/app/actions/finalizeSelectionAction.tsx */
import { addSelectedUnits, resetAndUpsertUnits, resetAndUpsertShips } from '../services/prismaUnitsService';
import { ISelectedUnit, IUnit, IShip, IMember } from '../interfaces/types';
import validators from '@/app/api/middlewares/validators';
import { fetchUnitsData } from '../services/unitService';
import { fetchPlayerData } from '../services/playerService';

// Função auxiliar para processar os dados do jogador
async function processPlayerData(members: IMember[], selectedUnits: IUnit[]): Promise<ProcessedUnitData[]> {
  const unitsData: ProcessedUnitData[] = []; // Esta é a estrutura que conterá os dados processados
  // ... Aqui, talvez inicialize unitsData com valores padrão, se necessário.

  for (const member of members) {
    try {
      const playerData = await fetchPlayerData(member.ally_code.toString());

      for (const unit of playerData.units) {
        if (selectedUnits.some(sUnit => sUnit.base_id === unit.data.base_id)) {
          // ... Lógica existente do useEffect vai aqui.
          // Em vez de atualizar diretamente as variáveis de estado, atualizaremos a estrutura unitsData.
        }
      }
    } catch (error: any) {
      console.error(`Failed to fetch data for member with allyCode: ${member.ally_code}. ${error.message}`);
    }
  }
  return unitsData;  // Retorne os dados processados
}

export async function finalizeSelectionAction(localSelectedUnits: ISelectedUnit[], members: IMember[]) {
  // 1. Validar localSelectedUnits
  validators.validateSelectedUnitsData(localSelectedUnits);

  // 2. Gravar localSelectedUnits no banco de dados.
  await addSelectedUnits(localSelectedUnits);

  // 3. Realizar upsert nas tabelas de unidades.
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