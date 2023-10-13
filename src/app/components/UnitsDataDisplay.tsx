/* File: src/app/components/UnitsDataDisplay.tsx */
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IMember, ISelectedUnit, IUnit, IShip } from '../interfaces/types';

interface IUnitsDataUpdateProps {
  selectedUnits: ISelectedUnit[];
  members: IMember[];
}

function UnitsDataDisplay({
  selectedUnits,
  members
}: IUnitsDataUpdateProps) {
  const [unitsData, setUnitsData] = useState<IUnit[]>([]);
  const [shipsData, setShipsData] = useState<IShip[]>([]);

  useEffect(() => {
    // Atualizar os dados das unidades e naves com base nas unidades selecionadas e membros
    selectedUnits.forEach((selected) => {
      if (selected.type === 'UNIT') {
        const unit: IUnit = {
          id: selected.id,
          base_id: selected.base_id,
          name: selected.name,
          quantity: selected.quantity + members.length,
          omicron_count_1: selected.omicron_count_1 + members.length,
          omicron_count_2: selected.omicron_count_2 + members.length,
          omicron_count_3: selected.omicron_count_3 + members.length,
        };
        setUnitsData((prevData) => [...prevData, unit]);
      } else {
        const ship: IShip = {
          id: selected.id,
          base_id: selected.base_id,
          name: selected.name,
          quantity: selected.quantity + members.length,
        };
        setShipsData((prevData) => [...prevData, ship]);
      }
    });
  }, [selectedUnits, members]);

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