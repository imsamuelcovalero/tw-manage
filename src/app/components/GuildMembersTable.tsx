// src/app/components/GuildMembersTable.tsx
"use client";
import { useState } from 'react';
import { IMember } from '../interfaces/types';

interface IGuildMembersTableProps {
  members: IMember[];
}

function GuildMembersTable({ members }: IGuildMembersTableProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<"player_name" | "galactic_power">("galactic_power");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
    </div>
  );
}

export default GuildMembersTable;
