/* File: src/app/api/guild/route.tsx */
import { getCurrentGuild } from '@/app/services/prismaGuildService';
import { handleDatabaseOperation } from '../helpers';

export async function GET() {
  console.log('getCurrentGuild');
  const result = await handleDatabaseOperation(() => getCurrentGuild(), 'Guilda retornada com sucesso!');
  console.log('result_getCurrentGuild', result);
  return result;
  // return handleDatabaseOperation(() => getCurrentGuild(), "Guilda retornada com sucesso!");
}
