/* File: src/app/components/UnitsDataDisplay.tsx */
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchPlayerData } from '../services/playerService';
import { IMember, ISelectedUnit, IUnit, IShip, IOmicronAbility } from '../interfaces/types';
import ReactSelect from 'react-select';

interface IUnitsDataUpdateProps {
  unitsData: IUnit[];
  shipsData: IShip[];
}

function UnitsDataDisplay({
  unitsData,
  shipsData
}: IUnitsDataUpdateProps) {
  console.log('unitsData', unitsData);
  const [selectedUnitDetails, setSelectedUnitDetails] = useState<IUnit | null>(null);
  console.log('selectedUnitDetails', selectedUnitDetails);


  function prepareDropdownData(players: string[]): { value: string; label: string }[] {
    return players.map(player => ({ value: player, label: player }));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="units-data-update p-6 bg-white shadow-lg rounded-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Dados das Unidades e Naves</h1>

        {/* Exibição das tabelas */}
        <table className="mb-6 w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/3 py-2 px-4 border-b border-gray-300 text-center">Unidade</th>
              <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center">Quantidade</th>
              <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center">1 Omicron</th>
              <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center">2 Omicrons</th>
              <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center">3 Omicrons</th>
            </tr>
          </thead>
          <tbody>
            {unitsData.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (unit.omicronPlayers && unit.omicronPlayers.length > 0) {
                    if (selectedUnitDetails?.id === unit.id) {
                      setSelectedUnitDetails(null);
                    } else {
                      setSelectedUnitDetails(unit);
                    }
                  }
                }}
              >
                <td className="w-1/3 py-2 px-4 border-b border-gray-200 text-center">{unit.name}</td>
                <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center">{unit.quantity}</td>
                <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center">{unit.omicron_count_1}</td>
                <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center">{unit.omicron_count_2}</td>
                <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center">{unit.omicron_count_3}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="mb-6 w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b border-gray-300 text-center">Nave</th>
              <th className="py-2 px-4 border-b border-gray-300 text-center">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {shipsData.map((ship) => (
              <tr key={ship.id} className="hover:bg-gray100">
                <td className="py-2 px-4 border-b border-gray-200 text-center">{ship.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{ship.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Exibição da tabela de detalhes dos omicrons */}
        {selectedUnitDetails && selectedUnitDetails.omicronPlayers && (
          <table>
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-gray-300 text-center">{selectedUnitDetails.name}</th>
                {selectedUnitDetails?.omicronPlayers?.map((omicronPlayer, index) => (
                  <th key={index} className="py-2 px-4 border-b border-gray-300 text-center">{omicronPlayer.omicronId}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 text-center">Players</td>
                {selectedUnitDetails?.omicronPlayers?.map((omicronPlayer, index) => (
                  <td key={index} className="mb-2 w-full md:w-1/2 py-2 px-4 border-b border-gray-200 text-center">
                    <ReactSelect
                      options={prepareDropdownData(omicronPlayer.players)}
                      isMulti
                      placeholder="Players"
                      className="w-full"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UnitsDataDisplay;