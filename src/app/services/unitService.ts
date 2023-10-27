/* File: src/app/services/unitService.ts */
const BASE_SWGOH_URL = "https://swgoh.gg/api";
import * as apiService from './apiService';

export function getUnitsApiLink() {
  return `${BASE_SWGOH_URL}/units/`;
}

export function getShipsApiLink() {
  return `${BASE_SWGOH_URL}/ships/`;
}

export async function fetchUnitsData() {
  const apiUrl = getUnitsApiLink()

  const proxyResponse = await apiService.getSwgohData(apiUrl);
  // console.log('proxyResponse', proxyResponse);

  return proxyResponse;
  // try {
  //   const response = await fetch(apiUrl, { cache: 'no-store' });
  //   if (!response.ok) {
  //     console.error('Response status:', response.status);
  //     console.error('Response text:', await response.text());
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const result = await response.json();
  //   console.log('result_U', result);
  //   return result;
  //   // console.log('response_U', response.json());
  //   // return await response.json();
  // } catch (error: any) {
  //   console.error("There was a problem with the fetch operation:", error.message);
  //   return null;
  // }
}

// Crie uma função que busca os dados de uma unidade específica
export async function fetchUnitData(unitId: number) {
  const apiUrl = `${getUnitsApiLink()}${unitId}`

  const proxyResponse = await apiService.getSwgohData(apiUrl);
  // console.log('proxyResponse', proxyResponse);

  return proxyResponse;
}

export async function fetchShipsData() {
  const apiUrl = getShipsApiLink()

  const proxyResponse = await apiService.getSwgohData(apiUrl);
  // console.log('proxyResponse', proxyResponse);

  return proxyResponse;
  // try {
  //   const apiUrl = process.env.NODE_ENV === 'production'
  //     ? getShipsApiLink()
  //     : `${process.env.NEXT_PUBLIC_BASE_URL}/api/ships`; // Assumindo que você terá uma rota de API local para navios

  //   const response = await fetch(apiUrl, { cache: 'no-store' });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const result = await response.json();
  //   console.log('result_S', result);
  //   return result;
  //   // console.log('response_S', response.json());
  //   // return await response.json();
  // } catch (error: any) {
  //   console.error("There was a problem with the fetch operation:", error.message);
  //   return null;
  // }
}