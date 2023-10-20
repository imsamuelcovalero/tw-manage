/* File: src/app/components/UnitsDataDisplay.tsx */
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchPlayerData } from '../services/playerService';
import { IMember, ISelectedUnit, IUnit, IShip, IOmicronAbility } from '../interfaces/types';
import ReactSelect from 'react-select';
import { getInteractionStateFromLocalStorage } from '../helpers/localStorageHelper';

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
  // console.log('selectedUnitDetails', selectedUnitDetails);

  const isNewInteraction = getInteractionStateFromLocalStorage() || false;
  console.log('isNewInteraction', isNewInteraction);


  function prepareDropdownData(players: string[]): { value: string; label: string }[] {
    return players.map(player => ({ value: player, label: player }));
  }

  return (
    !isNewInteraction ? (
      <div className="w-full h-full flex justify-center items-center bg-gray-100">
        <div className="units-data p-6 bg-white shadow-lg rounded-lg max-w-screen-xl h-full">
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
                  Back
                </button>
              </div>
            </>
          ) : (
            <div className="overflow-x-auto">
              {/* Display tables */}
              <h1 className="text-2xl font-bold mb-6 text-center">Unit and Ship Data</h1>
              <table className="mb-6 w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="w-1/3 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">Unit</th>
                    <th className="w-1/6 py-2 px-4 border-b border-gray-300 text-center sm:text-sm">Quantity</th>
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
                      title={unit.omicronPlayers && unit.omicronPlayers.length > 0 ? "Click to view detailed Omicron attributes" : ""}
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
                    <th className="py-2 px-4 border-b border-gray-300 text-center">Ship</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-center">Quantity</th>
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
    ) : (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Unit and Ship Data</h1>
        <h2 className="text-xl mb-6 text-center">First, select a unit or ship to view its details</h2>
      </div>
    )
  );
}

export default UnitsDataDisplay;