/* File: src/app/auth/callback/route.ts */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

import type { Database } from '@/lib/database.types'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()

  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)

  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/login', req.url))
}

// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url)
//   console.log('requestUrl', requestUrl);

//   const code = requestUrl.searchParams.get('code')
//   console.log('code', code);


//   if (code) {
//     const cookieStore = cookies()
//     console.log('cookieStore', cookieStore);

//     const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   // const absoluteUrl = new URL("/", request.nextUrl.origin);
//   // return NextResponse.redirect(absoluteUrl.toString());
//   // URL to redirect to after sign in process completes
//   return NextResponse.redirect(requestUrl.origin)
// }