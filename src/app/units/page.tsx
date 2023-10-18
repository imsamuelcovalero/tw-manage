import React from 'react'
import { getAllSelectedUnits, getAllUnits, getAllShips } from '../services/prismaUnitsService';
import UnitsDataDisplay from '../components/UnitsDataDisplay';

export default async function Page() {
  // const selectedUnits = await getAllSelectedUnits();

  // if (!selectedUnits) {
  //   console.log('Units not found');
  //   return;
  // }

  // const members = await getMembers();

  // if (!members) {
  //   console.log('Members not found');
  //   return;
  // }

  const unitsData = await getAllUnits();

  const shipsData = await getAllShips();

  return (
    <main >
      {unitsData && shipsData && (
        <UnitsDataDisplay unitsData={unitsData} shipsData={shipsData} />
      )}
    </main>
  )
}