/* File: /src/app/api/swgohApi/route.tsx */
// import { createRouter } from 'next-connect';
// import corsMiddleware from '@/middlewares/cors';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// const router = createRouter();

// router.use(corsMiddleware);

export async function POST(req: NextRequest) {
  const apiUrl = await req.json();  // Obtain the URL of the external endpoint from the request body
  const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.json();
    console.log('dataX', data);
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json({ message: "No data returned from operation." }, { status: 204 });  // Status 204: No Content
  }

  // try {
  //   const result = await fetch(apiUrl).then((res) => res.json());  // Fetch the data from the external endpoint
  //   console.log('resultX', result);

  //   if (result) {
  //     return NextResponse.json({ data: result, message: "Data returned from operation." }, { status: 200 });
  //   } else {
  //     return NextResponse.json({ message: "No data returned from operation." }, { status: 204 });  // Status 204: No Content
  //   }
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     console.error(error.message);
  //     return NextResponse.json({ message: error.message }, { status: 500 });
  //   } else {
  //     console.error('An unexpected error occurred:', error);
  //     return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  //   }
  // }
}