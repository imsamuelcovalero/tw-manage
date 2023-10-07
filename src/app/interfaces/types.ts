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

// Representa a base para entidades do jogo (unidades e navios)
interface IGameEntity {
  id?: number;
  base_id: string;
  name: string;
  quantity: number;
}

// Unidades herdam propriedades de IGameEntity e adicionam propriedades específicas
export interface IUnit extends IGameEntity {
  omicron_count_1: number;
  omicron_count_2: number;
  omicron_count_3: number;
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