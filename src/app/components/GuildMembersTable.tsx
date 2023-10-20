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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Guild Members</h2>
      {isMembersTableExpanded && (
        <>
          <p className="text-sm text-gray-500 mb-2">
            Select the members who are participating in TW.
          </p>
          <div className="relative my-2">
            <input
              type="text"
              placeholder="Search by player name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8 p-2 w-full border rounded"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              🔍
            </span>
          </div>
        </>
      )}
      <div className="overflow-x-auto md:overflow-visible">
        <table className="w-10/12 md:w-full mx-auto divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  if (sortColumn === "player_name") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortColumn("player_name");
                    setSortDirection("asc");
                  }
                }}
              >
                Name
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  if (sortColumn === "galactic_power") {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortColumn("galactic_power");
                    setSortDirection("asc");
                  }
                }}
              >
                Galactic Power
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ally Code
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
            </tr>
          </thead>
          {isMembersTableExpanded ? (
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member, index) => (
                <tr key={member.ally_code}>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {member.player_name}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {member.galactic_power}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {member.ally_code}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
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
                {selectedMembers.length ? "Remove Selected Members" : "Start with All"}
              </button>
            </tbody>
          ) : (
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <button onClick={toggleMembersTable} className="w-full py-2" disabled={!filteredMembers.length}>
                    Expand Members Table
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <style jsx>{`
      @media (max-width: 650px) {
        .overflow-x-auto {
          overflow-x: auto;
        }
      }
    `}</style>
    </div>
  );
}

export default GuildMembersTable;
