/* File: src/app/units/page.tsx */
import React from 'react'
import { getAllUnits, getAllShips } from '../services/prismaUnitsService';
import UnitsDataDisplay from '../components/UnitsDataDisplay';

export default async function Page() {
  const unitsData = await getAllUnits();

  const shipsData = await getAllShips();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {(unitsData.length > 0 || shipsData.length > 0) ? (
        <UnitsDataDisplay unitsData={unitsData} shipsData={shipsData} />
      ) : (
        <p className="text-center">No data available for units or ships at the moment.</p>
      )}
    </main>
  )
}