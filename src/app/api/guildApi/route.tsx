import { createRouter } from 'next-connect';
import corsMiddleware from '@/middlewares/cors';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const router = createRouter();

router.use(corsMiddleware);

export async function POST(req: NextRequest) {
  const apiUrl = await req.json();  // Obtain the URL of the external endpoint from the request body
  try {
    const result = await fetch(apiUrl).then((res) => res.json());  // Fetch the data from the external endpoint
    console.log('resultX', result);

    if (result) {
      return NextResponse.json({ data: result, message: "Data returned from operation." }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No data returned from operation." }, { status: 204 });  // Status 204: No Content
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error('An unexpected error occurred:', error);
      return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next';
// import httpProxyMiddleware from "next-http-proxy-middleware";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const apiUrl = req.query.apiUrl as string;

//   if (!apiUrl) {
//     res.status(400).json({ error: 'API Url is required' });
//     return;
//   }

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }