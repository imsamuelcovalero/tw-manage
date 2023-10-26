/* File: src/app/services/apiService.ts */
// const BASE_URL = 'http://localhost:3000/api'; // ou a URL base da sua API
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';
const REVALIDATE_TIME = 900;  // tempo de revalidação em segundos (15 minutos)

// async function fetchWithRevalidate(endpoint: string, options: RequestInit = {}) {
//   console.log('fetchWithRevalidateX');

//   const response = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     next: { revalidate: REVALIDATE_TIME }  // tempo de revalidação em segundos (15 minutos)
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Something went wrong');
//   }
//   const responseJson = await response.json();
//   return responseJson.data;  // Retornando apenas a propriedade data do objeto JSON.
// }

function headersToObject(headers: Headers): Record<string, string> {
  let result: Record<string, string> = {};
  headers.forEach((value, name) => {
    result[name] = value;
  });
  return result;
}

async function fetchWithRevalidate(endpoint: string, options: RequestInit = {}): Promise<any> {
  console.log('fetchWithRevalidateX - Endpoint:', endpoint);  // Log do endpoint que está sendo acessado.

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      next: { revalidate: REVALIDATE_TIME }  // tempo de revalidação em segundos (15 minutos)
    });

    console.log('Response Status:', response.status);  // Log do status da resposta.
    console.log('Response Headers:', JSON.stringify(headersToObject(response.headers)));  // Log dos cabeçalhos da resposta.

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error Data:', JSON.stringify(errorData));  // Log de qualquer erro retornado pela API.
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseJson = await response.json();
    console.log('Response JSON:', JSON.stringify(responseJson));  // Log do JSON de resposta.
    return responseJson.data;  // Retornando apenas a propriedade data do objeto JSON.
  } catch (error: any) {
    console.error('Fetch Error:', error.message);  // Log de qualquer erro que ocorra durante o fetch.
    throw error;  // Re-lançamento do erro para ser capturado e tratado por qualquer código que chama esta função.
  }
}

export async function getGuildData() {
  console.log('getGuildDataX', BASE_URL);

  const data = await fetchWithRevalidate('/guild');
  console.log('dataBancoGuild', data);
  return data;
}

export async function getMembersData() {
  const data = await fetchWithRevalidate('/members');
  // console.log('dataBancoMembers', data);

  return data;
}

export async function getSelectedUnitsData() {
  const data = await fetchWithRevalidate('/selectedUnits');
  // console.log('dataBancoSelectedUnits', data);
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

export async function getSwgohData(url: string) {
  const response = await fetchWithErrors('/swgohApi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(url),  // Enviando a URL no corpo da requisição.
  });
  console.log('response', response);

  return response;
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

