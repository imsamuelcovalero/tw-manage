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

// interface IHomeProps {
//   guild: IGuild;
//   members: IMember[];
//   selectedUnits: ISelectedUnit[];
// }

export default async function Home() {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // async function fetchData(url: string) {
  //   const res = await fetch(`${baseUrl}${url}`, { next: { revalidate: 900 } });
  //   console.log('res', res);

  //   return res.json();
  // }

  const guild: IGuild = await apiService.getGuildData();
  const members: IMember[] = await apiService.getMembersData();

  // if (!members) {
  //   console.log('No members');

  //   return (
  //     <div className="container mx-auto px-4 py-8 flex flex-col items-center">
  //       <h1 className="text-4xl font-bold mb-4">Home</h1>
  //       {guild ? (
  //         <GuildUrlInput guild={guild} />
  //       ) : (
  //         <GuildUrlInput />
  //       )}
  //       <h1 className="text-3xl mt-4 font-medium">Guild Name: {guild?.name}</h1>
  //     </div>
  //   );
  // }

  const selectedUnits: ISelectedUnit[] = await apiService.getSelectedUnitsData();
  // if (!selectedUnits) {
  //   return (
  //     <div className="container mx-auto px-4 py-8 flex flex-col items-center">
  //       <h1 className="text-4xl font-bold mb-4">Home</h1>
  //       {guild ? (
  //         <GuildUrlInput guild={guild} />
  //       ) : (
  //         <GuildUrlInput />
  //       )}
  //       <h1 className="text-3xl mt-4 font-medium">Guild Name: {guild?.name}</h1>
  //       {members && <GuildMembersTable members={members} />}
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      {guild ? (
        <GuildUrlInput guild={guild} />
      ) : (
        <GuildUrlInput />
      )}
      <h1 className="text-3xl mt-4 font-medium">Guild Name: {guild?.name}</h1>
      {members && <GuildMembersTable members={members} />}
      {selectedUnits && <SelectedUnitsDisplay selectedUnits={selectedUnits} members={members} />}
    </div>
  );
}