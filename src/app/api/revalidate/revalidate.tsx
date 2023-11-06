/* File: src/app/api/revalidate/revalidate.tsx */
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';

export async function revalidatePage(path: string) {
  console.log('pathX', path);

  const response = await fetch(`${BASE_URL}/revalidate?path=${path}`, {
    method: 'POST',
    cache: 'no-cache',
  });
  const data = await response.json();
  console.log('dataXXX', data);

  if (!response.ok) {
    console.log('Error revalidating page:', data);
    throw new Error(data.message);
  }
}
