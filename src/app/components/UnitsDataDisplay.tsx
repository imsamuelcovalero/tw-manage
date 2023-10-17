/* File: src/app/components/UnitsDataDisplay.tsx */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchPlayerData } from '../services/playerService';
import { IMember, ISelectedUnit, IUnit, IShip } from '../interfaces/types';

interface IUnitsDataUpdateProps {
  unitsData: IUnit[];
  shipsData: IShip[];
}

function UnitsDataDisplay({
  unitsData,
  shipsData
}: IUnitsDataUpdateProps) {
  // const [unitsData, setUnitsData] = useState<IUnit[]>([]);
  // const [shipsData, setShipsData] = useState<IShip[]>([]);

  // useEffect(() => {
  //   async function fetchDataForMembers() {
  //     for (const member of members) {
  //       try {
  //         const playerData = await fetchPlayerData(member.ally_code.toString());

  //         // Process units
  //         for (const unit of playerData.units) {
  //           if (selectedUnits.some(sUnit => sUnit.base_id === unit.data.base_id)) {
  //             if (unit.data.combat_type === 1) { // It's a UNIT
  //               const existingUnit = unitsData.find(u => u.base_id === unit.data.base_id);
  //               if (existingUnit) {
  //                 existingUnit.quantity += 1;

  //                 const omicronLength = unit.data.omicron_abilities.length;
  //                 switch (omicronLength) {
  //                   case 1:
  //                     existingUnit.omicron_count_1 += 1;
  //                     break;
  //                   case 2:
  //                     existingUnit.omicron_count_2 += 1;
  //                     break;
  //                   case 3:
  //                     existingUnit.omicron_count_3 += 1;
  //                     break;
  //                 }
  //               }
  //             } else if (unit.data.combat_type === 2) { // It's a SHIP
  //               const existingShip = shipsData.find(s => s.base_id === unit.data.base_id);
  //               if (existingShip) {
  //                 existingShip.quantity += 1;
  //               }
  //             }
  //           }
  //         }
  //       } catch (error: any) {
  //         toast.error(`Failed to fetch data for member with allyCode: ${member.ally_code}. ${error.message}`);
  //       }
  //     }
  //   }

  //   fetchDataForMembers();
  // }, [members, selectedUnits]);

  // Função de atualização para ser usada futuramente
  const handleUpdateData = () => {
    console.log('Função para atualizar os dados das unidades no backend.');
  };

  return (
    <div className="units-data-update p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Atualizar Dados das Unidades e Naves</h2>

      {/* Exibição das tabelas */}
      <table className="mb-4 w-full">
        <thead>
          <tr>
            <th>Unidade</th>
            <th>Quantidade</th>
            <th>Omicron 1</th>
            <th>Omicron 2</th>
            <th>Omicron 3</th>
          </tr>
        </thead>
        <tbody>
          {unitsData.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.name}</td>
              <td>{unit.quantity}</td>
              <td>{unit.omicron_count_1}</td>
              <td>{unit.omicron_count_2}</td>
              <td>{unit.omicron_count_3}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="mb-4 w-full">
        <thead>
          <tr>
            <th>Nave</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {shipsData.map((ship) => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleUpdateData} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Atualizar Dados
      </button>
    </div >
  );
}

export default UnitsDataDisplay;