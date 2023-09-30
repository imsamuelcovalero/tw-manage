/* File: src/app/api/upsertGuild/route.tsx */
import { NextResponse } from 'next/server'
import { upsertGuild } from '../../services/prismaGuildService';
import validators from '@/app/api/middlewares/validators';

export async function POST(req: Request) {
  try {
    const guildData = await req.json();
    console.log('Data received:', guildData);

    validators.validateGuildData(guildData);

    const success = await upsertGuild(guildData);

    if (success) {
      return NextResponse.json({ message: "Guilda iniciada com sucesso!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Erro ao iniciar a guilda." }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}