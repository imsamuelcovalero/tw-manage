/* File: src/app/services/playerService.ts */
// Funções para a lógica do jogador
const BASE_SWGOH_URL = "https://swgoh.gg/api";
import * as apiService from './apiService';

export function getPlayerApiLink(allyCode: string) {
  return `${BASE_SWGOH_URL}/player/${allyCode}/`;
}

export async function fetchPlayerData(allyCode: string) {
  const apiUrl = getPlayerApiLink(allyCode);

  const proxyResponse = await apiService.getSwgohData(apiUrl);
  // console.log('proxyResponse', proxyResponse);

  return proxyResponse;
  // try {
  //   const response = await fetch(apiUrl, { cache: 'no-store' });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const result = await response.json();
  //   console.log('result_P', result);
  //   return result;
  //   // console.log('response_P', response.json());
  //   // return await response.json();
  // } catch (error: any) {
  //   console.error("There was a problem with the fetch operation:", error.message);
  //   return null;
  // }
}