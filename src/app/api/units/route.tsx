/* File: src/app/api/member/route.tsx */
import { upsertMembers, removeMembersByAllyCodes } from '@/app/services/prismaMembersService';
import validators from '@/app/api/middlewares/validators';
import { handleDatabaseOperation } from '../helpers';

export async function POST(req: Request) {
  const membersData = await req.json();
  validators.validateMembersData(membersData);
  // console.log('Data received:', membersData);

  return await handleDatabaseOperation(() => upsertMembers(membersData), "Membros adicionados com sucesso!");
}

export async function DELETE(req: Request) {
  const { allyCodesData } = await req.json(); // isso supõe que você está passando um objeto com uma propriedade `allyCodesData` que é uma array de números.
  validators.validateAllyCodesData(allyCodesData);
  // console.log('Data received:', allyCodesData);

  return await handleDatabaseOperation(() => removeMembersByAllyCodes(allyCodesData), "Membros removidos com sucesso!");
}