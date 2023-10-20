"use client";
import { ISelectedUnit } from '../interfaces/types';

const LOCAL_STORAGE_KEY = 'selectedUnits';
const INTERACTION_KEY = 'isNewInteraction';

// Função para adicionar todas as unidades selecionadas vindas do banco de dados
export function addSelectedUnitsToLocalStorage(units: ISelectedUnit[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(units));
}

// Função para pegar as unidades selecionadas do localStorage
export function getSelectedUnitsFromLocalStorage(): ISelectedUnit[] {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
}

// Função para adicionar uma unidade ao localStorage
export function addUnitToLocalStorage(unit: ISelectedUnit): void {
  const currentUnits = getSelectedUnitsFromLocalStorage();
  const updatedUnits = [...currentUnits, unit];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUnits));
}

// Função para remover uma unidade do localStorage
export function removeUnitFromLocalStorage(base_id: string): void {
  const currentUnits = getSelectedUnitsFromLocalStorage();
  const updatedUnits = currentUnits.filter(unit => unit.base_id !== base_id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUnits));
}

// Função para limpar todas as unidades do localStorage
export function clearUnitsFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// Função para definir o estado da interação no localStorage
export function setInteractionStateInLocalStorage(isNew: boolean): void {
  localStorage.setItem(INTERACTION_KEY, JSON.stringify(isNew));
}

// Função para obter o estado da interação do localStorage
export function getInteractionStateFromLocalStorage(): boolean {
  const storedData = localStorage.getItem(INTERACTION_KEY);

  if (storedData) {
    return JSON.parse(storedData);
  }
  return true; // Se não tiver dados armazenados, consideramos que é uma nova interação
}