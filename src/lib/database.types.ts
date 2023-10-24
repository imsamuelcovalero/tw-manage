export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      BackupMember: {
        Row: {
          ally_code: number
          galactic_power: number
          guildId: string | null
          id: number
          player_name: string
        }
        Insert: {
          ally_code: number
          galactic_power: number
          guildId?: string | null
          id?: number
          player_name: string
        }
        Update: {
          ally_code?: number
          galactic_power?: number
          guildId?: string | null
          id?: number
          player_name?: string
        }
        Relationships: []
      }
      Guild: {
        Row: {
          id: number
          name: string
          url: string
        }
        Insert: {
          id?: number
          name: string
          url: string
        }
        Update: {
          id?: number
          name?: string
          url?: string
        }
        Relationships: []
      }
      Member: {
        Row: {
          ally_code: number
          galactic_power: number
          guildId: string | null
          id: number
          player_name: string
        }
        Insert: {
          ally_code: number
          galactic_power: number
          guildId?: string | null
          id?: number
          player_name: string
        }
        Update: {
          ally_code?: number
          galactic_power?: number
          guildId?: string | null
          id?: number
          player_name?: string
        }
        Relationships: []
      }
      SelectedUnit: {
        Row: {
          base_id: string
          id: number
          name: string
          omicron1Id: string | null
          omicron2Id: string | null
          omicron3Id: string | null
          type: Database["public"]["Enums"]["UnitType"]
        }
        Insert: {
          base_id: string
          id?: number
          name: string
          omicron1Id?: string | null
          omicron2Id?: string | null
          omicron3Id?: string | null
          type: Database["public"]["Enums"]["UnitType"]
        }
        Update: {
          base_id?: string
          id?: number
          name?: string
          omicron1Id?: string | null
          omicron2Id?: string | null
          omicron3Id?: string | null
          type?: Database["public"]["Enums"]["UnitType"]
        }
        Relationships: []
      }
      Ship: {
        Row: {
          base_id: string
          id: number
          name: string
          quantity: number
        }
        Insert: {
          base_id: string
          id?: number
          name: string
          quantity: number
        }
        Update: {
          base_id?: string
          id?: number
          name?: string
          quantity?: number
        }
        Relationships: []
      }
      Unit: {
        Row: {
          base_id: string
          id: number
          name: string
          omicron_count_1: number
          omicron_count_2: number
          omicron_count_3: number
          omicron1Id: string | null
          omicron2Id: string | null
          omicron3Id: string | null
          quantity: number
        }
        Insert: {
          base_id: string
          id?: number
          name: string
          omicron_count_1: number
          omicron_count_2: number
          omicron_count_3: number
          omicron1Id?: string | null
          omicron2Id?: string | null
          omicron3Id?: string | null
          quantity: number
        }
        Update: {
          base_id?: string
          id?: number
          name?: string
          omicron_count_1?: number
          omicron_count_2?: number
          omicron_count_3?: number
          omicron1Id?: string | null
          omicron2Id?: string | null
          omicron3Id?: string | null
          quantity?: number
        }
        Relationships: []
      }
      UnitOmicronPlayers: {
        Row: {
          id: number
          omicronId: string
          players: string[] | null
          unitId: number
        }
        Insert: {
          id?: number
          omicronId: string
          players?: string[] | null
          unitId: number
        }
        Update: {
          id?: number
          omicronId?: string
          players?: string[] | null
          unitId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UnitOmicronPlayers_unitId_fkey"
            columns: ["unitId"]
            referencedRelation: "Unit"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      UnitType: "UNIT" | "SHIP"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
