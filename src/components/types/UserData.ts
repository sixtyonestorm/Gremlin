// src/types/UserData.ts
export interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
    attack_power: number | undefined;
  }
  