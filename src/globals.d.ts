// global.d.ts

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
  }
  
  interface TelegramWebApp {
    expand(): void;
    initDataUnsafe?: {
      user?: TelegramUser;
    };
    // Diğer Telegram WebApp API metodları ve özellikleri burada tanımlanabilir
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  