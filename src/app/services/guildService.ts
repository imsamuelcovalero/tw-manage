/* File: src/app/services/guildService.ts */
const BASE_SWGOH_URL = "https://swgoh.gg/api";

export function extractGuildId(url: string): string | null {
  const match = url.match(/\/g\/([^\/]+)\//);
  return match ? match[1] : null;
}

export function getGuildApiLink(guildId: string) {
  return `${BASE_SWGOH_URL}/guild-profile/${guildId}/`;
}

export async function fetchGuildData(url: string) {
  const guildId = extractGuildId(url);
  console.log('guildId_G', guildId);

  if (!guildId) {
    console.warn("Invalid URL provided. Unable to extract guild ID.");
    return null;
  }
  try {
    // const apiUrl = `${process.env.BASE_URL}${getGuildApiLink(guildId)}`;
    // console.log('apiUrl', apiUrl);
    // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    // console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL);

    const apiUrl = process.env.NODE_ENV === 'production'
      ? getGuildApiLink(guildId)
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/guild-profile?guildId=${guildId}`;
    console.log('apiUrl_G', apiUrl);

    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}