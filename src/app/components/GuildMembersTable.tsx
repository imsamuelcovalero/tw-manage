// src/app/components/GuildMembersTable.tsx
"use client";
import { useState, useContext } from 'react';
import { IMember } from '../interfaces/types';
import { removeMembers } from '../services/apiService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import TwManageContext from '../providers/TwManageContext';

interface IGuildMembersTableProps {
  members: IMember[];
}

function GuildMembersTable({ members }: IGuildMembersTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<"player_name" | "galactic_power">("galactic_power");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState('');

  const { isMembersTableExpanded, toggleMembersTable } = useContext(TwManageContext);

  const router = useRouter();

  const sortedMembers = [...members].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const handleCheckboxChange = (allyCode: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMembers((prevSelected) => [...prevSelected, allyCode]);
    } else {
      setSelectedMembers((prevSelected) =>
        prevSelected.filter((code) => code !== allyCode)
      );
    }
  };

  async function handleRemoveSelected() {
    try {
      // Se nenhum membro estiver selecionado, encolhe a tabela.
      if (!selectedMembers.length) {
        toggleMembersTable();
        return;
      }

      await removeMembers(selectedMembers);
      setSelectedMembers([]);
      toggleMembersTable();

      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        // Handle any other unknown errors
        console.error('An unexpected error occurred:', error);
        toast.error('An unexpected error occurred.');
      }
    }
  }

  const filteredMembers = sortedMembers.filter(member =>
    member.player_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Membros da Guilda</h2>
      <input
        type="text"
        placeholder="Buscar pelo nome do jogador..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="my-2 p-2 border rounded w-full"
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No.
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => {
                if (sortColumn === "player_name") {
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                } else {
                  setSortColumn("player_name");
                  setSortDirection("asc");
                }
              }}
            >
              Nome
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => {
                if (sortColumn === "galactic_power") {
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                } else {
                  setSortColumn("galactic_power");
                  setSortDirection("asc");
                }
              }}
            >
              Poder Galáctico
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ally Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Selecione
            </th>
          </tr>
        </thead>
        {isMembersTableExpanded ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member, index) => (
              <tr key={member.ally_code}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.player_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.galactic_power}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.ally_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.ally_code)}
                    onChange={(e) =>
                      handleCheckboxChange(member.ally_code, e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
            <button
              className={`fixed bottom-4 right-4 py-2 px-4 rounded z-10 ${selectedMembers.length
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              onClick={handleRemoveSelected}
            >
              {selectedMembers.length ? "Remover Membros Selecionados" : "Iniciar com Todos"}
            </button>
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan={5}>
                <button onClick={toggleMembersTable} className="w-full py-2" disabled={!filteredMembers.length}>
                  Expandir Tabela de Membros
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default GuildMembersTable;
