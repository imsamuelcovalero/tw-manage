// src/app/components/SelectedUnitsDisplay.tsx
"use client";
import { useState, useEffect } from 'react';
import { fetchUnitsData, fetchShipsData } from '../services/unitService';
import { ISelectedUnit } from '../interfaces/types';
import ReactSelect from 'react-select';

interface ISelectedUnitsDisplayProps {
  selectedUnits: ISelectedUnit[];
}

function SelectedUnitsDisplay({ selectedUnits }: ISelectedUnitsDisplayProps) {
  const [units, setUnits] = useState<ISelectedUnit[]>([]);
  const [ships, setShips] = useState<ISelectedUnit[]>([]);
  const [unitsSelected, setUnitsSelected] = useState<ISelectedUnit[]>([]);
  console.log('unitsSelected', unitsSelected);

  const [unitSearchValue, setUnitSearchValue] = useState('');
  const [shipSearchValue, setShipSearchValue] = useState('');

  function processUnitData(data: any): ISelectedUnit[] {
    return data.map((unit: any) => ({
      base_id: unit.base_id,
      name: unit.name,
      type: 'unit'
    }));
  }

  function processShipData(data: any): ISelectedUnit[] {
    return data.map((ship: any) => ({
      base_id: ship.base_id,
      name: ship.name,
      type: 'ship'
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

  const handleSelect = (type: 'unit' | 'ship', selectedOption: any) => {
    if (!selectedOption || !selectedOption.value) return; // Adicione esta verificação

    const base_id = selectedOption.value; // Extraia o base_id aqui
    const allData = type === 'unit' ? units : ships;
    const selected = allData.find(u => u.base_id === base_id);

    if (selected && !unitsSelected.some(u => u.base_id === selected.base_id)) {
      setUnitsSelected(prev => [...prev, selected]);

      if (type === 'unit') {
        setUnits(units => units.filter(u => u.base_id !== selected.base_id));
      } else {
        setShips(ships => ships.filter(s => s.base_id !== selected.base_id));
      }
    }
  };

  const availableUnits = units.filter(u => !selectedUnits.some(su => su.base_id === u.base_id));
  const availableShips = ships.filter(s => !selectedUnits.some(su => su.base_id === s.base_id));

  // Filtrar unidades e navios disponíveis com base na busca
  const filteredUnits = availableUnits.filter(unit =>
    unit.name.toLowerCase().includes(unitSearchValue.toLowerCase())
  );

  const filteredShips = availableShips.filter(ship =>
    ship.name.toLowerCase().includes(shipSearchValue.toLowerCase())
  );

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
        {selectedUnits.map(unit => (
          <span key={unit.base_id} className="unit-tag py-1 px-2 bg-blue-200 rounded-full text-sm" title={unit.name}>{unit.name}</span>
        ))}
      </div>
    </div>
  );
}

export default SelectedUnitsDisplay;
