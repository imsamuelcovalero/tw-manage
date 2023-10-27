/* File: src/app/services/guildService.ts */
const BASE_SWGOH_URL = "https://swgoh.gg/api";
import * as apiService from './apiService';

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

  const apiUrl = getGuildApiLink(guildId);

  const proxyResponse = await apiService.getSwgohData(apiUrl);
  console.log('proxyResponse', proxyResponse);

  return proxyResponse;
}