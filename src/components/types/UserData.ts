// src/types/UserData.ts
export interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
    attack_power: number | undefined;
    level: number | undefined;
    total_exp: number | undefined;
    mined_boss_coin: number | undefined;
    mined_mining_coin: number | undefined;
    mined_quests_coin: number | undefined;
    mined_dungeon_coin: number | undefined;
    mined_ref_coin: number | undefined;
    total_mined_coin: number | undefined;
  }
  