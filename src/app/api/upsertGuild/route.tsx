/* File: src/app/api/upsertGuild/route.tsx */
import { upsertGuild } from '../../services/prismaGuildService';
import validators from '@/app/api/middlewares/validators';
import { handleDatabaseOperation } from '../helpers';

export async function POST(req: Request) {
  const guildData = await req.json();
  validators.validateGuildData(guildData);
  // console.log('Data received:', guildData);

  return handleDatabaseOperation(() => upsertGuild(guildData), "Guilda iniciada com sucesso!");
}