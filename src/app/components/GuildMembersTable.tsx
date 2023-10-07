// src/app/components/GuildMembersTable.tsx
"use client";
import { useState } from 'react';
import { IMember } from '../interfaces/types';
import { removeMembers } from '../services/apiService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface IGuildMembersTableProps {
  members: IMember[];
}

function GuildMembersTable({ members }: IGuildMembersTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<"player_name" | "galactic_power">("galactic_power");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
      await removeMembers(selectedMembers);
      // Atualizar a lista de membros após exclusão (se necessário)
      // setMembers(members => members.filter(member => !selectedMembers.includes(member.ally_code)));

      // Limpar a lista de membros selecionados após a exclusão
      setSelectedMembers([]);

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

  return (
    <div className="container">
      <h2>Membros da Guilda</h2>
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
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedMembers.map((member, index) => (
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
        </tbody>
      </table>
      <button
        className={`fixed bottom-4 right-4 py-2 px-4 rounded z-10 ${selectedMembers.length
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-red-200 text-red-500 cursor-not-allowed"
          }`}
        onClick={handleRemoveSelected}
        disabled={!selectedMembers.length}
      >
        Remover Membros Selecionados
      </button>
    </div>
  );
}

export default GuildMembersTable;
