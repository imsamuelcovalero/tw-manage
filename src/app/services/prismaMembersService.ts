/* File: src/app/services/prismaMembersService.ts */
import { PrismaClient } from '@prisma/client';
import { IMember } from '../interfaces/types';

const prisma = new PrismaClient();

// Função para gravar os players atuais na tabela 'BackupMembers'
export async function backupCurrentMembers(): Promise<void> {
  const currentMembers = await prisma.member.findMany();

  // Transação para deletar os dados atuais de BackupMembers e inserir os dados atuais de Members
  await prisma.$transaction([
    prisma.backupMember.deleteMany(),
    prisma.backupMember.createMany({ data: currentMembers })
  ]);
}

// Função para fazer upsert na tabela 'Members'
export async function upsertMember(memberData: IMember): Promise<IMember> {
  const existingMember = await prisma.member.findUnique({
    where: {
      ally_code: memberData.ally_code
    }
  });

  if (existingMember) {
    return await prisma.member.update({
      where: {
        id: existingMember.id
      },
      data: memberData
    });
  } else {
    return await prisma.member.create({
      data: memberData
    });
  }
}

// Função para consultar os players de 'BackupMembers'
export async function getBackupMembers(): Promise<IMember[]> {
  return await prisma.backupMember.findMany();
}

// Função para consultar os players de 'Members'
export async function getMembers(): Promise<IMember[]> {
  return await prisma.member.findMany();
}

// Função para consultar um player por ally_code em 'BackupMembers'
export async function getBackupMemberByAllyCode(allyCode: number): Promise<IMember | null> {
  return await prisma.backupMember.findUnique({
    where: {
      ally_code: allyCode
    }
  });
}

// Função para consultar um player por ally_code em 'Members'
export async function getMemberByAllyCode(allyCode: number): Promise<IMember | null> {
  return await prisma.member.findUnique({
    where: {
      ally_code: allyCode
    }
  });
}

// Lembre-se de fechar a conexão do Prisma quando seu servidor for encerrado.
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});