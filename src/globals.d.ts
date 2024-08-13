interface TelegramWebApp {
  expand(): void;
  // Diğer Telegram WebApp API metodları ve özellikleri burada tanımlanabilir
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
