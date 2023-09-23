// Funções para a lógica do jogador
export function getPlayerApiLink(allyCode: string) {
  return `/api/player?allyCode=${allyCode}`;
}

export async function fetchPlayerData(allyCode: string) {
  try {
    const apiUrl = `http://localhost:3000${getPlayerApiLink(allyCode)}`;
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