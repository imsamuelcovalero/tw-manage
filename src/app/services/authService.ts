/* File: src/app/services/authService.ts */
/*
  Não usado
*/

import { supabase } from "../database/supabaseClient";
import { useRouter } from 'next/navigation';

export default async function AuthService() {
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('userX', user);

  if (!user) {
    router.push('/login');
  }
}