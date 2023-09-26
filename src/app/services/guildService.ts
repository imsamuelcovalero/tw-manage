/* File: src/app/services/guildService.ts */
export function extractGuildId(url: string): string | null {
  const match = url.match(/\/g\/([^\/]+)\//);
  return match ? match[1] : null;
}

export function getGuildApiLink(guildId: string) {
  return `/api/guild?guildId=${guildId}`;
}

export async function fetchGuildData(url: string) {
  const guildId = extractGuildId(url);
  if (!guildId) {
    console.warn("Invalid URL provided. Unable to extract guild ID.");
    return null;
  }
  try {
    // const apiUrl = `${process.env.BASE_URL}${getGuildApiLink(guildId)}`;
    // console.log('apiUrl', apiUrl);

    const apiUrl = process.env.NODE_ENV === 'production'
      ? `https://swgoh.gg/api/guild-profile/${guildId}/`
      : `${process.env.BASE_URL}${getGuildApiLink(guildId)}`;
    console.log('apiUrl', apiUrl);

    const response = await fetch(apiUrl, { cache: 'no-store' });
    // console.log('response', response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}