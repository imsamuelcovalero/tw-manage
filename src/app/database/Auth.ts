/* File: src/app/database/Auth.ts */
/*
  Não usado
*/
'use client'
import { useEffect, useState } from 'react'
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('user', user);

      if (user) {
        setIsAuthenticated(true)
      }
    }
    verifyAuth()
  }, [])

  return isAuthenticated
}
