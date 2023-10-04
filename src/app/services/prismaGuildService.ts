/* File: src/app/services/prismaGuildService.ts */
import { PrismaClient } from '@prisma/client';
import { IGuild, IGuildCreationInput } from '../interfaces/types';

const prisma = new PrismaClient();

// Função para inserir ou atualizar uma guilda.
export async function upsertGuild(guildData: IGuild): Promise<boolean> {
  try {
    // Deletar todas as guildas existentes
    await prisma.guild.deleteMany();

    // Criar uma nova entrada com os novos dados
    const creationData: IGuildCreationInput = {
      name: guildData.name,
      url: guildData.url
    };

    await prisma.guild.create({
      data: creationData
    });

    return true; // Se chegou até aqui, a operação foi bem-sucedida
  } catch (error) {
    console.error('Error in upsertGuild:', error);
    return false; // Houve um erro durante a operação
  }
}

// Função para consultar informações da guilda atual.
export async function getCurrentGuild(): Promise<IGuild | null> {
  return await prisma.guild.findFirst();
}

// Função para consultar todas as guildas.
export async function getAllGuilds(): Promise<IGuild[]> {
  return await prisma.guild.findMany();
}

// Função para consultar informações de uma guilda pela URL.
export async function getGuildByUrl(guildUrl: string): Promise<IGuild | null> {
  return await prisma.guild.findUnique({
    where: {
      url: guildUrl
    }
  });
}

// Lembre-se de fechar a conexão do Prisma quando seu servidor for encerrado.
// Isso pode ser feito, por exemplo, ouvindo o evento 'beforeExit':
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});