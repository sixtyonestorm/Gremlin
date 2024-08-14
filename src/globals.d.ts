interface TelegramWebApp {
  [x: string]: initDataUnsafe;
  expand(): void;
  // Diğer Telegram WebApp API metodları ve özellikleri burada tanımlanabilir
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}

