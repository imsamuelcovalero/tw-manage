/* File: src/app/services/prismaGuildService.ts */
import { PrismaClient } from '@prisma/client';
import { IGuild, IGuildCreationInput } from '../interfaces/types'; // Ajuste o caminho conforme necessário.

const prisma = new PrismaClient();

// Função para inserir ou atualizar uma guilda.
export async function upsertGuild(guildData: IGuild): Promise<IGuild> {
  const existingGuild = await prisma.guild.findUnique({
    where: {
      url: guildData.url
    }
  });

  if (existingGuild) {
    return await prisma.guild.update({
      where: {
        id: existingGuild.id
      },
      data: guildData // IGuild é usado aqui, então o campo `id` é aceito
    });
  } else {
    const creationData: IGuildCreationInput = {
      name: guildData.name,
      url: guildData.url
    };
    return await prisma.guild.create({
      data: creationData // Apenas nome e url são passados aqui
    });
  }
}

// Função para consultar informações de uma guilda pelo ID.
export async function getCurrentGuild(): Promise<IGuild | null> {
  return await prisma.guild.findFirst();
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