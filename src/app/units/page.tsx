/* File: src/app/units/page.tsx */
import React from 'react'
import { getAllUnits, getAllShips } from '../services/prismaUnitsService';
import UnitsDataDisplay from '../components/UnitsDataDisplay';
import AuthenticatedLayout from '../authenticatedLayout';
import { revalidatePage } from '../api/revalidate/revalidate';

export default async function Page() {
  await revalidatePage('/units');
  const unitsData = await getAllUnits();

  const shipsData = await getAllShips();

  return (
    <AuthenticatedLayout>
      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        {(unitsData.length > 0 || shipsData.length > 0) ? (
          <UnitsDataDisplay unitsData={unitsData} shipsData={shipsData} />
        ) : (
          <p className="text-center">No data available for units or ships at the moment.</p>
        )}
      </main>
    </AuthenticatedLayout>
  )
}