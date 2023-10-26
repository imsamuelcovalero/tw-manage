// import { createRouter } from 'next-connect';
// import corsMiddleware from '@/middlewares/cors';
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// const router = createRouter();

// router.use(corsMiddleware);

// export async function POST(req: NextRequest) {
//   const { apiUrl } = await req.json();  // Obtain the URL of the external endpoint from the request body
//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   console.log('dataRoute', data);

//   return data;  // Ensure to return data in the required format
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from "next-http-proxy-middleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = req.query.apiUrl as string;

  if (!apiUrl) {
    res.status(400).json({ error: 'API Url is required' });
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}