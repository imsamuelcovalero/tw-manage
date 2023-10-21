/* File: src/app/home.tsx */
import React from 'react'
import { fetchGuildData, extractGuildId } from './services/guildService';
import { fetchPlayerData } from './services/playerService';
import { IGuild } from './interfaces/types';
import { getCurrentGuild } from './services/prismaGuildService';
import { getMembers } from './services/prismaMembersService';
import { getAllSelectedUnits } from './services/prismaUnitsService';
import GuildUrlInput from './components/GuildUrlInput';
import GuildMembersTable from './components/GuildMembersTable';
import SelectedUnitsDisplay from './components/SelectedUnitsDisplay';

export default async function Home() {

  const guild = await getCurrentGuild();
  // console.log('guild', guild);

  const members = await getMembers();

  if (!members) {
    console.log('Members not found');
    return;
  }

  const selectedUnits = await getAllSelectedUnits();

  if (!selectedUnits) {
    console.log('Units not found');
    return;
  }

  // const allyCode = "417229579";
  // const player = await fetchPlayerData(allyCode);
  // console.log('player', player);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      {guild ? (
        <GuildUrlInput guild={guild} />
      ) : (
        <GuildUrlInput />
      )}
      <h1 className="text-3xl mt-4 font-medium">Guild Name: {guild?.name}</h1>
      <GuildMembersTable members={members} />
      <SelectedUnitsDisplay selectedUnits={selectedUnits} members={members} />
    </div>
  );
}