/* File: src/app/api/upsertGuild/route.tsx */
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import { upsertGuild } from '../../services/prismaGuildService';

export async function POST(req: Request) {
  try {
    // Validação dos dados recebidos
    // console.log('req', req);

    const guildData = await req.json();
    console.log('Data received:', guildData);

    if (!guildData || !guildData.url || !guildData.name) {
      return NextResponse.json({ message: 'Invalid data format. URL and name are required.' });
    }

    const updatedGuild = await upsertGuild(guildData);
    console.log('Guild updated:', updatedGuild);

    return NextResponse.json(updatedGuild);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error.' });
  }
}