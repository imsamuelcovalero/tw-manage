/* File: src/app/api/member/route.tsx */
import { NextResponse } from 'next/server'
import { upsertMembers } from '@/app/services/prismaMembersService';
import validators from '@/app/api/middlewares/validators';

export async function POST(req: Request) {
  try {
    const membersData = await req.json();
    validators.validateMembersData(membersData);
    // console.log('Data received:', membersData);

    const success = await upsertMembers(membersData);

    if (success) {
      return NextResponse.json({ message: "Membros adicionados com sucesso!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Erro ao adicionar membros." }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}