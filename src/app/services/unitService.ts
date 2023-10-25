/* File: src/app/services/unitService.ts */
const BASE_SWGOH_URL = "https://swgoh.gg/api";

export function getUnitsApiLink() {
  return `${BASE_SWGOH_URL}/units/`;
}

export function getShipsApiLink() {
  return `${BASE_SWGOH_URL}/ships/`;
}

export async function fetchUnitsData() {
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? getUnitsApiLink()
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/units`; // Assumindo que você terá uma rota de API local para unidades

    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const resultText = await response.text();
    console.log('resultText_U', resultText);
    const result = await response.json();
    console.log('result_U', result);
    return result;
    // console.log('response_U', response.json());
    // return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}

// Crie uma função que busca os dados de uma unidade específica
export async function fetchUnitData(unitId: number) {
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? `${getUnitsApiLink()}${unitId}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/units/${unitId}`; // Assumindo que você terá uma rota de API local para unidades

    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result_U2', result);
    return result;
    // console.log('response_U2', response.json());
    // return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}

export async function fetchShipsData() {
  try {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? getShipsApiLink()
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/ships`; // Assumindo que você terá uma rota de API local para navios

    const response = await fetch(apiUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result_S', result);
    return result;
    // console.log('response_S', response.json());
    // return await response.json();
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
    return null;
  }
}