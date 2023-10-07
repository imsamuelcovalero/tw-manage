/* File: /src/app/providers/TwManageContext.tsx */
"use client";

import { createContext } from 'react';
import { IGuild } from '../interfaces/types';

// Interfaces para os dados que serão mantidos no estado global.
interface IGuildContext {
  guild: IGuild | null;
}

// Se você planeja adicionar mais dados no futuro, simplesmente adicione-os aqui.
interface ITwManageContext extends IGuildContext {
  updateGuild: (newGuild: IGuild) => void;
  // Outras interfaces, exemplo:
  // members: IMember[];
  // settings: ISettings;
}

const TwManageContext = createContext<ITwManageContext | undefined>(undefined);

export default TwManageContext;