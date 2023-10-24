/* File: src/app/components/Login.tsx */
'use client'
import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'

// interface MySupabaseAuthClient extends SupabaseAuthClient {
//   user: () => any;
// }

export const Login = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /*
    Não usado
  */
  // useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (user) {
  //       console.log('session', user);


  //       router.push('/');
  //     }
  //   };
  //   getUser();
  // }, []);

  return (
    <div className="container w-full max-w-md mx-auto mt-20">
      <div className="my-4">
        <p className="text-sm text-gray-600 mb-2">Faça login com o Google:</p>
        <Auth
          supabaseClient={supabase}
          providers={['google']}
          queryParams={{
            access_type: 'offline',
            // prompt: 'consent',
            hd: 'domain.com',
          }}
          onlyThirdPartyProviders
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          redirectTo={`${baseUrl}/auth/callback`}
        />
      </div>
    </div>
  );
};