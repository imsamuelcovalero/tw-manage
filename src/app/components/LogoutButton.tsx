/* File: src/app/components/LogoutButton.tsx */
'use client'
import React from "react";
import { supabase } from "../database/supabaseClient";

export const LogoutButton = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};