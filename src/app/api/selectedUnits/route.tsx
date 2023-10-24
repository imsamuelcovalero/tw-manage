/* File: src/app/api/selectedUnits/route.tsx */
import { getAllSelectedUnits } from '@/app/services/prismaUnitsService';
import { handleDatabaseOperation } from '../helpers';

export async function GET() {
  return handleDatabaseOperation(() => getAllSelectedUnits(), "Unidades retornadas com sucesso!");
}
