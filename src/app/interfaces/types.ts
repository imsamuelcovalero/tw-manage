/* File: src/app/interfaces/types.ts */
export interface IMember {
  id?: number;
  player_name: string;
  galactic_power: number;
  ally_code: number;
  guildId?: number;
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
  name: string;
  quantity: number;
}

// Unidades herdam propriedades de IGameEntity e adicionam propriedades específicas
export interface IUnit extends IGameEntity {
  omicron: boolean;
}

// Navios herdam propriedades de IGameEntity
export interface IShip extends IGameEntity { }