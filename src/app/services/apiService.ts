/* File: src/app/services/apiService.ts */
// const BASE_URL = 'http://localhost:3000/api'; // ou a URL base da sua API
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';
const REVALIDATE_TIME = 900;  // tempo de revalidação em segundos (15 minutos)

async function fetchWithRevalidate(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    next: { revalidate: REVALIDATE_TIME }  // tempo de revalidação em segundos (15 minutos)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  const responseJson = await response.json();
  return responseJson.data;  // Retornando apenas a propriedade data do objeto JSON.
}

export async function getMembersData() {
  const data = await fetchWithRevalidate('/members');
  return data;
}

export async function getGuildData() {
  const data = await fetchWithRevalidate('/guild');
  return data;
}

export async function getSelectedUnitsData() {
  const data = await fetchWithRevalidate('/selectedUnits');
  return data;
}

async function fetchWithErrors(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Something went wrong');
  }
  return response.json();
}

export async function upsertGuild(data: any) {
  return fetchWithErrors('/upsertGuild', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function upsertMembers(data: any) {
  return fetchWithErrors('/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function removeMembers(allyCodes: number[]) {
  return fetchWithErrors('/members', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ allyCodesData: allyCodes }),  // Enviando a lista de allyCodes no corpo da requisição.
  });
}

