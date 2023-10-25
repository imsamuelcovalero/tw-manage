/* File: src/app/api/selectedUnits/route.tsx */
import { getAllSelectedUnits } from '@/app/services/prismaUnitsService';
import { handleDatabaseOperation } from '../helpers';

export async function GET() {
  const result = await handleDatabaseOperation(() => getAllSelectedUnits(), 'Unidades retornadas com sucesso!');
  console.log('result_getAllSelectedUnits', result);
  return result;
  // return handleDatabaseOperation(() => getAllSelectedUnits(), "Unidades retornadas com sucesso!");
}
