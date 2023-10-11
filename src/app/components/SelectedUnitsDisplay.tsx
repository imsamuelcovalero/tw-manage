// src/app/components/SelectedUnitsDisplay.tsx
"use client";
import { useState, useEffect } from 'react';
import { fetchUnitsData, fetchShipsData } from '../services/unitService';
import { ISelectedUnit } from '../interfaces/types';
import ReactSelect from 'react-select';
import { getSelectedUnitsFromLocalStorage, addSelectedUnitsToLocalStorage, clearUnitsFromLocalStorage } from '../helpers/localStorageHelper';
import { useRouter } from 'next/navigation';
import { finalizeSelectionAction } from '../actions/finalizeSelectionAction';
import { toast } from 'react-toastify';

interface ISelectedUnitsDisplayProps {
  selectedUnits: ISelectedUnit[];
}

function SelectedUnitsDisplay({ selectedUnits }: ISelectedUnitsDisplayProps) {
  const [units, setUnits] = useState<ISelectedUnit[]>([]);
  const [ships, setShips] = useState<ISelectedUnit[]>([]);
  const [localSelectedUnits, setLocalSelectedUnits] = useState<ISelectedUnit[]>(getSelectedUnitsFromLocalStorage());
  console.log('localSelectedUnits', localSelectedUnits);

  const router = useRouter();

  // Inicialização na Montagem do Componente
  useEffect(() => {
    const initialUnits = getSelectedUnitsFromLocalStorage();
    console.log('initialUnits', initialUnits);

    if (initialUnits.length === 0) {
      addSelectedUnitsToLocalStorage(selectedUnits);
      setLocalSelectedUnits(selectedUnits);
    } else {
      setLocalSelectedUnits(initialUnits);
    }
  }, []);

  // Atualizações de localSelectedUnits no localStorage
  useEffect(() => {
    console.log('localSelectedUnits', localSelectedUnits);

    addSelectedUnitsToLocalStorage(localSelectedUnits);
  }, [localSelectedUnits]);

  function processUnitData(data: any): ISelectedUnit[] {
    return data.map((unit: any) => ({
      base_id: unit.base_id,
      name: unit.name,
      type: 'UNIT'
    }));
  }

  function processShipData(data: any): ISelectedUnit[] {
    return data.map((ship: any) => ({
      base_id: ship.base_id,
      name: ship.name,
      type: 'SHIP'
    }));
  }

  useEffect(() => {
    async function fetchData() {
      const unitsData = await fetchUnitsData();
      // console.log('unitsData', unitsData);
      const shipsData = await fetchShipsData();
      // console.log('shipsData', shipsData);
      setUnits(processUnitData(unitsData.data));
      setShips(processShipData(shipsData));
    }

    fetchData();
  }, []);

  async function handleFinalizeSelection() {
    try {
      // 1. Chama a action que realiza a gravação no banco de dados.
      await finalizeSelectionAction(localSelectedUnits);

      // 2. Apaga os dados do localStorage.
      clearUnitsFromLocalStorage();

      // Mensagem de sucesso
      toast.success('Unidades selecionadas foram salvas com sucesso!', {
        autoClose: 3000
      });

      // Espera um pouco antes de redirecionar, para dar tempo do toast ser visualizado.
      setTimeout(() => {
        // 3. Direciona para a página de exibição das informações das unidades.
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

  const handleSelect = (type: 'unit' | 'ship', selectedOption: any) => {
    if (!selectedOption || !selectedOption.value) return; // Adicione esta verificação

    const base_id = selectedOption.value; // Extraia o base_id aqui
    const allData = type === 'unit' ? units : ships;
    const selected = allData.find(u => u.base_id === base_id);

    if (selected && !localSelectedUnits.some(u => u.base_id === selected.base_id)) {
      setLocalSelectedUnits(prev => [...prev, selected]);

      if (type === 'unit') {
        setUnits(units => units.filter(u => u.base_id !== selected.base_id));
      } else {
        setShips(ships => ships.filter(s => s.base_id !== selected.base_id));
      }
    }
  };

  const availableUnits = units.filter(u => !localSelectedUnits.some(su => su.base_id === u.base_id));
  const availableShips = ships.filter(s => !localSelectedUnits.some(su => su.base_id === s.base_id));

  // Opções para o dropdown de unidades
  const unitOptions = availableUnits.map(unit => ({ value: unit.base_id, label: unit.name }));

  // Opções para o dropdown de navios
  const shipOptions = availableShips.map(ship => ({ value: ship.base_id, label: ship.name }));

  return (
    <div className="selected-units-section p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Unidades Selecionadas</h2>

      <div className="dropdowns-section mb-4 flex gap-4 flex-col md:flex-row">
        {/* Campo de busca para units */}
        <div className="mb-2 w-full md:w-1/2">
          <ReactSelect
            options={unitOptions}
            isSearchable
            placeholder="Selecione uma unidade"
            onChange={(selectedOption) => handleSelect('unit', selectedOption)}
          />
        </div>

        {/* Campo de busca para navios */}
        <div className="mb-2 w-full md:w-1/2">
          <ReactSelect
            options={shipOptions}
            isSearchable
            placeholder="Selecione um navio"
            onChange={(selectedOption) => handleSelect('ship', selectedOption)}
          />
        </div>
      </div>

      <div className="selected-units flex flex-wrap gap-2">
        {localSelectedUnits.map(unit => (
          <span key={unit.base_id} className="unit-tag py-1 px-2 bg-blue-200 rounded-full text-sm" title={unit.name}>{unit.name}</span>
        ))}
      </div>

      <div className="finalize-selection mt-4">
        {localSelectedUnits.length > 0 ? (
          <button
            onClick={handleFinalizeSelection}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Concluir Seleção
          </button>
        ) : (
          <p className="text-red-500">Ao menos uma unidade deve ser selecionada.</p>
        )}
      </div>
    </div>
  );
}

export default SelectedUnitsDisplay;
