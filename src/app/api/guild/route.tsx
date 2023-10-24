/* File: src/app/api/guild/route.tsx */
import { getCurrentGuild } from '@/app/services/prismaGuildService';
import { handleDatabaseOperation } from '../helpers';

export async function GET() {
  console.log('getCurrentGuild');

  return handleDatabaseOperation(() => getCurrentGuild(), "Guilda retornada com sucesso!");
}
