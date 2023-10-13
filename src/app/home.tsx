/* File: src/app/home.tsx */
import React from 'react'
import { fetchGuildData, extractGuildId } from './services/guildService';
import { fetchPlayerData } from './services/playerService';
import { IGuild } from './interfaces/types';
import { upsertGuild, getCurrentGuild, getAllGuilds } from './services/prismaGuildService';
import { upsertMembers, getMembers } from './services/prismaMembersService';
import { getAllSelectedUnits } from './services/prismaUnitsService';
import GuildUrlInput from './components/GuildUrlInput';
import GuildMembersTable from './components/GuildMembersTable';
import SelectedUnitsDisplay from './components/SelectedUnitsDisplay';
// import { useGuild } from './providers/TwManageProvider';

export default async function Home() {

  const guild = await getCurrentGuild();
  // console.log('guild', guild);
  // const { guild: contextGuild } = useGuild();
  // console.log('contextGuild', contextGuild);

  if (!guild) {
    console.log('Guild not found');
    return;
  }

  // const isGuildExisting = Boolean(guild?.url);
  const data = await fetchGuildData(guild.url);

  /* Aqui vamos testar inserir os membros na tabela de membros */
  // Get the guildId from the URL
  const guildId = extractGuildId(guild.url);

  const members = await getMembers();

  if (!members) {
    // const data = await fetchGuildData(guild.url);
    // const membersData = data.data.members;
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
    <div className="container">
      <h1>Home</h1>
      <GuildUrlInput guild={guild} />
      <p>Guild Name: {guild?.name}</p>
      <GuildMembersTable members={members} />
      <SelectedUnitsDisplay selectedUnits={selectedUnits} />
    </div>
  )
}