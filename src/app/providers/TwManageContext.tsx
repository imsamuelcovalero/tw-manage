/* File: /src/app/providers/TwManageContext.tsx */
"use client";

import { createContext } from 'react';

// Interfaces para os dados que serão mantidos no estado global.
interface ITwManageContext {
  isMembersTableExpanded: boolean;
  toggleMembersTable: () => void;
}

const defaultContext: ITwManageContext = {
  isMembersTableExpanded: false,
  toggleMembersTable: () => { }
};

const TwManageContext = createContext<ITwManageContext>(defaultContext);

export default TwManageContext;