/* File: src/app/home.tsx */
import React, { useEffect } from 'react'
import { fetchGuildData, extractGuildId } from './services/guildService';
import { fetchPlayerData } from './services/playerService';
import { IGuild } from './interfaces/types';
import { upsertGuild, getCurrentGuild, getAllGuilds } from './services/prismaGuildService';
import { upsertMember, getMembers } from './services/prismaMembersService';
import GuildUrlInput from './components/guildUrlInput';

export default async function Home() {
  function transformGuildData(data: any): IGuild {
    return {
      name: data.name,
      url: "https://swgoh.gg/g/iGco7HmDSm6VbbIOxGoHuA/" // URL hardcoded
    };
  }

  const guildURL = "https://swgoh.gg/g/iGco7HmDSm6VbbIOxGoHuA/";
  const data = await fetchGuildData(guildURL);
  // console.log('data', data.data.members);
  const transformedData = transformGuildData(data.data);
  await upsertGuild(transformedData);

  const guild = await getCurrentGuild();
  // const guild = await getAllGuilds();
  console.log('guild', guild);

  if (!guild) {
    console.log('Guild not found');
    return;
  }

  // const isGuildExisting = Boolean(guild?.url);

  /* Aqui vamos testar inserir os membros na tabela de membros */
  // Get the guildId from the URL
  const guildId = extractGuildId(guild.url);

  // If we have a valid guildId, proceed to add the members
  if (guildId) {
    for (let member of data.data.members) {
      const memberData = {
        player_name: member.player_name,
        galactic_power: member.galactic_power,
        ally_code: member.ally_code,
        guildId: guildId  // Set the guildId for the member
      };

      // Upsert the member data
      await upsertMember(memberData);
    }
  }

  const members = await getMembers();

  const allyCode = "417229579";
  // const player = await fetchPlayerData(allyCode);
  // console.log('player', player);


  return (
    <div className="container">
      <h1>Home</h1>
      <GuildUrlInput guild={guild} />
      <p>Guild Name: {guild?.name}</p>
      {/* <p>Player Name: {player.data.name}</p> */}

      <h2>Membros da Guilda</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Poder Galáctico
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ally Code
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member: any, index: any) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}