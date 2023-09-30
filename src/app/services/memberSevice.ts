/* File: src/app/services/memberService.ts */
import { IMember } from "../interfaces/types";
import { extractGuildId } from "./guildService";

// Função para preparar os dados dos players para serem gravados no banco de dados
export function prepareMembersData(members: any[], guildUrl: string): IMember[] {
  const guildId = extractGuildId(guildUrl);

  return members.map(member => ({
    player_name: member.player_name,
    galactic_power: member.galactic_power,
    ally_code: member.ally_code,
    guildId: guildId
  }));
}