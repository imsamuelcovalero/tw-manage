import { createRouter } from 'next-connect';
import corsMiddleware from '@/middlewares/cors';
import { NextResponse } from 'next/server';

const router = createRouter();

router.use(corsMiddleware);

export async function POST(req: Request) {
  const { apiUrl } = await req.json();  // Obter a URL do endpoint externo a partir do corpo da requisição
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}