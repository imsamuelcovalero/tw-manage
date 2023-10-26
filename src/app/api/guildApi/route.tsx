import { createRouter } from 'next-connect';
import corsMiddleware from '@/middlewares/cors';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const router = createRouter();

router.use(corsMiddleware);

export async function POST(req: NextRequest) {
  const { apiUrl } = await req.json();  // Obtain the URL of the external endpoint from the request body
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('dataRoute', data);

  return data;  // Ensure to return data in the required format
}