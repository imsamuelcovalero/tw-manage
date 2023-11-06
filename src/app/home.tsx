/* File: src/app/home.tsx */
import React from 'react'
import { getCurrentGuild } from './services/prismaGuildService';
import { getMembers } from './services/prismaMembersService';
import { getAllSelectedUnits } from './services/prismaUnitsService';
import GuildUrlInput from './components/GuildUrlInput';
import GuildMembersTable from './components/GuildMembersTable';
import SelectedUnitsDisplay from './components/SelectedUnitsDisplay';
import { IGuild, IMember, ISelectedUnit } from './interfaces/types';
import * as apiService from './services/apiService';
import { revalidatePage } from './api/revalidate/revalidate';

// interface IHomeProps {
//   guild: IGuild;
//   members: IMember[];
//   selectedUnits: ISelectedUnit[];
// }

export default async function Home() {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log('homeX', process.env.NODE_ENV);

  let guild = null as IGuild | null;
  let members = [] as IMember[];
  let selectedUnits = [] as ISelectedUnit[];

  // Fetch guild data
  // guild = await apiService.getGuildData();
  await revalidatePage('/');
  guild = await getCurrentGuild();
  console.log('guildX', guild);


  // If guild data is available, fetch members data
  if (guild) {
    members = await getMembers();
    // members = await apiService.getMembersData();
  }

  // If members data is available, fetch selected units data
  if (members.length > 0) {
    selectedUnits = await getAllSelectedUnits();
    // selectedUnits = await apiService.getSelectedUnitsData();
  }
  // console.log('selectedUnits', selectedUnits);

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
      {/* {members.length > 0 && <GuildMembersTable members={members} />}
      {selectedUnits.length > 0 && <SelectedUnitsDisplay selectedUnits={selectedUnits} members={members} />} */}
    </div>
  );
}