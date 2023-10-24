// src/app/components/SelectedUnitsDisplay.tsx
"use client";
import { useState, useEffect, useContext } from 'react';
import { fetchUnitsData, fetchShipsData } from '../services/unitService';
import { ISelectedUnit, IMember } from '../interfaces/types';
import ReactSelect from 'react-select';
import { getSelectedUnitsFromLocalStorage, addSelectedUnitsToLocalStorage, clearUnitsFromLocalStorage } from '../helpers/localStorageHelper';
import { useRouter } from 'next/navigation';
import { finalizeSelectionAction } from '../actions/finalizeSelectionAction';
import { toast } from 'react-toastify';
// import { fetchPlayerData } from '../services/playerService';
import TwManageContext from '../providers/TwManageContext';
import { unitDataProcessorService, shipDataProcessorService } from '../services/dataProcessorService';
import { setInteractionStateInLocalStorage } from '../helpers/localStorageHelper';

interface ISelectedUnitsDisplayProps {
  selectedUnits: ISelectedUnit[];
  members: IMember[];
}

function SelectedUnitsDisplay({ selectedUnits, members }: ISelectedUnitsDisplayProps) {
  const [units, setUnits] = useState<ISelectedUnit[]>([]);
  const [ships, setShips] = useState<ISelectedUnit[]>([]);
  const [localSelectedUnits, setLocalSelectedUnits] = useState<ISelectedUnit[]>(getSelectedUnitsFromLocalStorage());

  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [selectedShip, setSelectedShip] = useState<any>(null);
  const [forceUpdateKey, setForceUpdateKey] = useState<number>(0);

  const { isMembersTableExpanded } = useContext(TwManageContext);

  const router = useRouter();

  // Inicialização na Montagem do Componente
  useEffect(() => {
    const initialUnits = getSelectedUnitsFromLocalStorage();

    if (initialUnits.length === 0 || selectedUnits.length === 0) {
      addSelectedUnitsToLocalStorage(selectedUnits);
      setLocalSelectedUnits(selectedUnits);
    } else {
      setLocalSelectedUnits(initialUnits);
    }
  }, []);

  // Atualizações de localSelectedUnits no localStorage
  useEffect(() => {
    addSelectedUnitsToLocalStorage(localSelectedUnits);
  }, [localSelectedUnits]);

  function processUnitData(data: any): ISelectedUnit[] {
    return data.map((unit: any) => {
      const omicronIds = unit.omicron_ability_ids || [];

      return {
        base_id: unit.base_id,
        name: unit.name,
        type: 'UNIT',
        omicron1Id: omicronIds[0] || null,
        omicron2Id: omicronIds[1] || null,
        omicron3Id: omicronIds[2] || null
      };
    });
  }

  function processShipData(data: any): ISelectedUnit[] {
    return data.map((ship: any) => ({
      base_id: ship.base_id,
      name: ship.name,
      type: 'SHIP',
      omicron1Id: null,
      omicron2Id: null,
      omicron3Id: null
    }));
  }

  useEffect(() => {
    async function fetchData() {
      // apagar depois
      // const player = await fetchPlayerData("417229579");
      // console.log('player', player.units);

      const unitsData = await fetchUnitsData();
      // console.log('unitsData', unitsData);
      const shipsData = await fetchShipsData();
      // console.log('shipsData', shipsData);
      setUnits(processUnitData(unitsData.data));
      setShips(processShipData(shipsData));
    }

    fetchData();
  }, []);

  // Opções para o dropdown de unidades
  const unitOptions = units
    .filter(unit => !localSelectedUnits.some(su => su.base_id === unit.base_id))
    .map(unit => ({ value: unit.base_id, label: unit.name }));

  // Opções para o dropdown de navios
  const shipOptions = ships
    .filter(ship => !localSelectedUnits.some(su => su.base_id === ship.base_id))
    .map(ship => ({ value: ship.base_id, label: ship.name }));

  const handleSelect = (type: 'unit' | 'ship', selectedOption: any) => {
    if (!selectedOption || !selectedOption.value) return;

    const base_id = selectedOption.value;
    const allData = type === 'unit' ? units : ships;
    const selected = allData.find(u => u.base_id === base_id);
    // console.log('selected', selected);


    if (selected && !localSelectedUnits.some(u => u.base_id === selected.base_id)) {
      setLocalSelectedUnits(prev => [...prev, selected]);
      setForceUpdateKey(prevKey => prevKey + 1);

      // Atualizando o estado de 'selectedUnit' e 'selectedShip'
      if (type === 'unit') {
        setSelectedUnit(null);
      } else {
        setSelectedShip(null);
      }
    }
  };

  // Função para remover uma unidade da lista localSelectedUnits
  const handleRemoveUnit = (unitToRemove: ISelectedUnit) => {
    setLocalSelectedUnits(prev => prev.filter(unit => unit.base_id !== unitToRemove.base_id));
    setForceUpdateKey(prevKey => prevKey + 1);
  };

  const handleClearSelection = () => {
    // Limpar o estado local
    setLocalSelectedUnits([]);

    // Limpar o localStorage
    clearUnitsFromLocalStorage();

    // Resetar o forceUpdateKey para forçar a atualização dos componentes ReactSelect
    setForceUpdateKey(prevKey => prevKey + 1);
  };

  async function handleFinalizeSelection() {
    try {
      // 1. Filtra as unidades selecionadas para obter apenas as unidades (type === 'UNIT') e apenas os navios (type === 'SHIP').
      const selectedUnitsOnly = localSelectedUnits.filter(unit => unit.type === 'UNIT');

      const selectedShipsOnly = localSelectedUnits.filter(unit => unit.type === 'SHIP');

      // 2. Chama o serviço que faz as interações necessárias para obter os dados apropriados para a gravação no banco de dados.
      const unitsData = await unitDataProcessorService(selectedUnitsOnly, members);
      // console.log('unitsDataX', unitsData);

      const shipsData = await shipDataProcessorService(selectedShipsOnly, members);
      // console.log('shipsData', shipsData);

      // 3. Chama a action que realiza a gravação no banco de dados.
      await finalizeSelectionAction(localSelectedUnits, unitsData, shipsData);

      // 4. Apaga os dados do localStorage.
      clearUnitsFromLocalStorage();

      // 5. Atualiza o localStorage para indicar que a interação foi finalizada.
      setInteractionStateInLocalStorage(false);

      // Mensagem de sucesso
      toast.success('Unidades selecionadas foram salvas com sucesso!', {
        autoClose: 3000
      });

      // Espera um pouco antes de redirecionar, para dar tempo do toast ser visualizado.
      setTimeout(() => {
        // 4. Direciona para a página de exibição das informações das unidades.
        router.push('/units');
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        // Handle any other unknown errors
        console.error('Ocorreu um erro inesperado:', error);
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  }

  return (
    !isMembersTableExpanded && (
      <div className="selected-units-section p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Unit Selection</h2>

        <div className="dropdowns-section mb-4 flex gap-4 flex-col md:flex-row">
          {/* Search field for units */}
          <div className="mb-2 w-full md:w-1/2" style={{ minWidth: '200px', maxWidth: '400px' }}>
            <ReactSelect
              key={forceUpdateKey}
              options={unitOptions}
              isSearchable
              placeholder="Select a unit"
              onChange={(selectedOption) => handleSelect('unit', selectedOption)}
              value={selectedUnit}
            />
          </div>

          {/* Search field for ships */}
          <div className="mb-2 w-full md:w-1/2" style={{ minWidth: '200px', maxWidth: '400px' }}>
            <ReactSelect
              key={forceUpdateKey}
              options={shipOptions}
              isSearchable
              placeholder="Select a ship"
              onChange={(selectedOption) => handleSelect('ship', selectedOption)}
              value={selectedShip}
            />
          </div>
        </div>

        <div className="selected-units flex flex-wrap gap-2">
          {localSelectedUnits.map(unit => (
            <div key={unit.base_id} className="unit-container flex items-center gap-1 bg-blue-200 rounded-full py-1 px-2 text-sm shadow-sm hover:shadow-md">
              <span title={unit.name}>{unit.name}</span>
              <button
                onClick={() => handleRemoveUnit(unit)}
                title='Remove Unit'
                className="remove-button text-red-500 ml-2 transition duration-300 ease-in-out transform hover:scale-150 hover:border-red-500 p-0.5 rounded-r-full cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="selected-units-actions mt-4 flex justify-between">
          {/* Clear Selection Button */}
          {localSelectedUnits.length > 0 && (
            <button
              onClick={handleClearSelection}
              className="bg-red-500 text-white px-4 py-2 rounded shadow"
              title="This will clear all selected units locally, without affecting the database."
            >
              Clear Selection
            </button>
          )}

          {/* Finalize Selection (or error message) */}
          {localSelectedUnits.length > 0 ? (
            <button
              onClick={handleFinalizeSelection}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
            >
              Finalize Selection
            </button>
          ) : (
            <p className="text-red-500">At least one unit must be selected.</p>
          )}
        </div>
      </div>
    )
  );
}

export default SelectedUnitsDisplay;
