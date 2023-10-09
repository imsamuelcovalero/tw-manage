/* File: src/app/providers/TwManageProvider.tsx */
"use client";

import React, { ReactNode, useContext, useMemo, useState } from 'react';
import TwManageContext from './TwManageContext';

interface ITwManageProviderProps {
  children: ReactNode;
}

export const useTwManage = () => {
  const context = useContext(TwManageContext);
  if (!context) {
    throw new Error('useTwManage must be used within a TwManageProvider');
  }
  return context;
};

export const TwManageProvider: React.FC<ITwManageProviderProps> = ({ children }) => {
  const [isMembersTableExpanded, setMembersTableExpanded] = useState(false);

  const toggleMembersTable = () => {
    setMembersTableExpanded(!isMembersTableExpanded);
  };

  // Se você for adicionar mais valores ou funções no futuro, adicione-os aqui.
  const contextValue = useMemo(() => ({
    isMembersTableExpanded,
    toggleMembersTable
    // ... adicione outros valores ou funções conforme necessário no futuro.
  }), [isMembersTableExpanded]);

  return (
    <TwManageContext.Provider value={contextValue}>
      {children}
    </TwManageContext.Provider>
  );
};
