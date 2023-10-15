/* File: src/app/interfaces/types.ts */
export interface IMember {
  id?: number;
  player_name: string;
  galactic_power: number;
  ally_code: number;
  guildId?: string | null;
}

export interface IGuildCreationInput {
  name: string;
  url: string;
}

export interface IGuild {
  id?: number;
  name: string;
  url: string;
}

// Interface para representar um omicron
interface IOmicronAbility {
  id?: number;
  omicronId: string; // ID da habilidade Omicron, por exemplo, 'specialskill_STARKILLER01'
  players: string[];
}

// Interface para representar uma unidade ou navio
interface IGameEntity {
  id?: number;
  base_id: string;
  name: string;
  quantity: number;
}

// Unidades herdam propriedades de IGameEntity
export interface IUnit extends IGameEntity {
  omicron_count_1: number;
  omicron_count_2: number;
  omicron_count_3: number;
  omicronAbilities?: IOmicronAbility[]; // Lista de habilidades Omicron associadas
}

// Navios herdam propriedades de IGameEntity
export interface IShip extends IGameEntity { }

// Representa uma unidade ou navio selecionado pelo usuário
export interface ISelectedUnit {
  id?: number;
  base_id: string;
  name: string;
  type: 'UNIT' | 'SHIP';
}