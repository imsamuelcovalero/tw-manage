import React from 'react'
import { getAllSelectedUnits } from '../services/prismaUnitsService';
import { getMembers } from '../services/prismaMembersService';
import UnitsDataDisplay from '../components/UnitsDataDisplay';

export default async function Page() {
  const selectedUnits = await getAllSelectedUnits();

  if (!selectedUnits) {
    console.log('Units not found');
    return;
  }

  const members = await getMembers();

  if (!members) {
    console.log('Members not found');
    return;
  }

  return (
    <main >
      <h1>Unidades</h1>
      <UnitsDataDisplay selectedUnits={selectedUnits} members={members} />
    </main>
  )
}