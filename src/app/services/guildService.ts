/* File: src/app/services/guildService.ts */
const BASE_SWGOH_URL = "https://swgoh.gg/api";
import proxyHandler from '../api/guildApi/route'

export function extractGuildId(url: string): string | null {
  const match = url.match(/\/g\/([^\/]+)\//);
  return match ? match[1] : null;
}

export function getGuildApiLink(guildId: string) {
  return `${BASE_SWGOH_URL}/guild-profile/${guildId}/`;
}

export async function fetchGuildData(url: string) {
  const guildId = extractGuildId(url);
  // console.log('guildId_G', guildId);

  if (!guildId) {
    console.warn("Invalid URL provided. Unable to extract guild ID.");
    return null;
  }
  try {
    const apiUrl = getGuildApiLink(guildId);
    const proxyUrl = `/api/guildApi?apiUrl=${encodeURIComponent(apiUrl)}`;  // A rota do proxy

    const proxyResponse = await fetch(proxyUrl);  // Fazendo a requisição para a rota do proxy

    if (!proxyResponse.ok) {
      throw new Error(`HTTP error! Status: ${proxyResponse.status}`);
    }

    const result = await proxyResponse.json();
    console.log('result_G', result);
    return result;
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}