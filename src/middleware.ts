/* File: src/middleware.ts */
import { createMiddlewareClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  // console.log('cookies', cookies());

  // const supabaseServer = createServerComponentClient({ cookies: () => cookies() })
  // // console.log('supabase', supabase.auth.getUser());


  const { data: { user } } = await supabase.auth.getUser()
  // console.log('user', user);

  // const { data: { session } } = await supabaseServer.auth.getSession();
  // console.log('session', session);

  // Se o usuário estiver logado e a URL atual for '/login', redirecione para a página principal.
  if (user && req.nextUrl.pathname === '/login') {
    console.log('XABLAU1');
    const absoluteUrl = new URL('/', req.nextUrl.origin).toString();

    return NextResponse.redirect(absoluteUrl);
    // return NextResponse.redirect(new URL('/', req.url))
  }

  // Se o usuário estiver logado e a URL atual for '/units', redirecione para a página de login.
  // if (user && req.nextUrl.pathname === '/units') {
  //   console.log('XABLAU');
  //   const absoluteUrl = new URL('/login', req.nextUrl.origin).toString();
  //   console.log('absoluteUrl2', absoluteUrl);

  //   return NextResponse.redirect(absoluteUrl);
  // }

  // Se o usuário não estiver logado e tentar acessar qualquer outra página que não seja '/login', redirecione para '/login'.
  if (!user && req.nextUrl.pathname !== '/login') {
    const absoluteUrl = new URL('/login', req.nextUrl.origin).toString();
    return NextResponse.redirect(absoluteUrl);
  }

  return res
}

export const config = {
  matcher: ['/', '/units', '/login'/* e outras rotas que você quiser proteger */],
}