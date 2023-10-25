/* File: src/app/services/playerService.ts */
// Funções para a lógica do jogador
const BASE_SWGOH_URL = "https://swgoh.gg/api";

export function getPlayerApiLink(allyCode: string) {
  return `${BASE_SWGOH_URL}/player?allyCode=${allyCode}`;
}

export async function fetchPlayerData(allyCode: string) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? getPlayerApiLink(allyCode)
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/player?allyCode=${allyCode}`;
    // console.log('apiUrl_P', apiUrl);

    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log('response_P', response.json());
    return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}