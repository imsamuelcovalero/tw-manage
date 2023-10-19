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

function formatOmicronId(omicronId: string): string {
  const parts = omicronId.split('_');
  if (parts[1].includes('0')) {
    const numberPart = parts[1].match(/0\d+/);
    return parts[0] + numberPart;
  }
  return parts[0];
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
      <div className="units-data p-6 bg-white shadow-lg rounded-lg w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5">
        {selectedUnitDetails && selectedUnitDetails.omicronPlayers ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Omicron Details</h1>
            <h2 className="text-xl mb-6 text-center">{selectedUnitDetails.name}</h2>
            <table className="w-full">
              <tbody>
                {selectedUnitDetails?.omicronPlayers?.map((omicronPlayer, index) => (
                  <tr key={index}>
                    <td className="mb-2 w-1/2 py-2 px-4 border-b border-gray-200 text-center">{formatOmicronId(omicronPlayer.omicronId)}</td>
                    <td className="mb-2 w-1/2 py-2 px-4 border-b border-gray-200 text-center">
                      <ReactSelect
                        options={prepareDropdownData(omicronPlayer.players)}
                        isMulti
                        placeholder="Players"
                        className="w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSelectedUnitDetails(null)}
              >
                Voltar
              </button>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Dados das Unidades e Naves</h1>
            {/* Exibição das tabelas */}
            <table className="mb-6 w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="w-1/3 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">Unidade</th>
                  <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">Quantidade</th>
                  <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">1 Omicron</th>
                  <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">2 Omicrons</th>
                  <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">3 Omicrons</th>
                </tr>
              </thead>
              <tbody>
                {unitsData.map((unit) => (
                  <tr
                    key={unit.id}
                    className={`hover:bg-gray-100 ${unit.omicronPlayers && unit.omicronPlayers.length > 0 ? 'cursor-pointer' : ''}`}
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
                    <td className="w-1/3 py-2 px-4 border-b border-gray-200 text-center sm:text-sm">{unit.name}</td>
                    <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center sm:text-sm">{unit.quantity}</td>
                    <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center sm:text-sm">{unit.omicron_count_1}</td>
                    <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center sm:text-sm">{unit.omicron_count_2}</td>
                    <td className="w-1/6 py-2 px-4 border-b border-gray-200 text-center sm:text-sm">{unit.omicron_count_3}</td>
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
          </div>
        )}
      </div>
    </div >
  );
}

export default UnitsDataDisplay;