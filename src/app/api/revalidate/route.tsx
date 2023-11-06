/* File: /src/app/api/revalidate/route.tsx */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// console.log('revalidatePath');

export async function POST(req: NextRequest) {
  // console.log('req', req);

  const origin = req.nextUrl.origin;
  console.log('origin', origin);

  const path = req.nextUrl.searchParams.get('path');
  console.log('path', path);


  if (path) {
    revalidatePath(`${origin}${path}`);
    return new Response(JSON.stringify({ revalidated: true, now: Date.now() }), { status: 200 });
  }

  return new Response(JSON.stringify({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  }), { status: 400 });
}