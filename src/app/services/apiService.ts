/* File: src/app/services/apiService.ts */
const BASE_URL = '/api';  // ou a URL base da sua API

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

