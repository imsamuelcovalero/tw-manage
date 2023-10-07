/* File: src/app/providers/TwManageProvider.tsx */
"use client";

import React, { ReactNode, useContext, useMemo, useState } from 'react';
import TwManageContext from './TwManageContext';
import { IGuild } from '../interfaces/types';

interface ITwManageProviderProps {
  children: ReactNode;
  guild: IGuild | null;
}

export const useGuild = () => {
  const context = useContext(TwManageContext);
  if (!context) {
    throw new Error('useGuild must be used within a GuildProvider');
  }
  return context;
};

export const TwManageProvider: React.FC<ITwManageProviderProps> = ({ children, guild }) => {
  const [currentGuild, setCurrentGuild] = useState(guild);

  const updateGuild = (newGuild: IGuild) => {
    setCurrentGuild(newGuild);
  };

  // Se você for adicionar mais valores ou funções no futuro, adicione-os aqui.
  const contextValue = useMemo(() => ({
    guild: currentGuild,
    updateGuild
    // ... adicione outros valores ou funções conforme necessário no futuro.
  }), [currentGuild]);

  return (
    <TwManageContext.Provider value={contextValue}>
      {children}
    </TwManageContext.Provider>
  );
};
