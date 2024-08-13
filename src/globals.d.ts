// global.d.ts
  
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
  