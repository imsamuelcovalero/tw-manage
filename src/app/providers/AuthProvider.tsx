/* File: src/app/providers/AuthProvider.tsx */
/*
  Não usado
*/
"use client";

import { useEffect, createContext, useContext, ReactNode, useMemo, useState } from "react";
import { supabase } from "@/app/database/supabaseClient";
import { useRouter } from 'next/navigation';


type AuthProviderProps = {
  supabase: typeof supabase;
  children?: ReactNode;
};

type AuthContextValue = {
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ supabase, ...props }: AuthProviderProps) => {

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.log('session', user);

        // router.push('/login');
      }
    };
    getUser();
  }, []);


  const contextValue = useMemo(() => {
    return {
      signOut: () => supabase.auth.signOut(),
    };
  }, [supabase]);

  return <AuthContext.Provider value={contextValue} {...props} />;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};