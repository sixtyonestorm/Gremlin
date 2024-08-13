import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import Header from './components/NavstoHead/Header';
import BottomNav from './components/NavstoHead/BottomNav';
import Game from './components/Game/Game';
import Mining from './components/Mining/Mining';
import Stats from './components/Stats/Stats';
import Inventory from './components/Inventory/Inventory';
import Guild from './components/Guild/Guild';
import Dungeon from './components/Dungeon/Dungeon';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const sendUserData = async (userData: UserData) => {
  try {
    const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to send user data');
    }

    const result = await response.json();
    console.log('User data sent successfully:', result);
  } catch (error) {
    console.error('Error sending user data:', error);
  }
};

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false); // Oyun ekranını kontrol etmek için state ekleyelim
  const [activeComponent, setActiveComponent] = useState<string>('game'); // default olarak 'game' bileşenini ayarla

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // WebApp SDK'dan kullanıcı verilerini al
        const user = WebApp.initDataUnsafe?.user;
        if (user) {
          const userData: UserData = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name || '',
            username: user.username || '',
            language_code: user.language_code || '',
            is_premium: user.is_premium || false,
          };
          setUserData(userData);
          // Kullanıcı verilerini sunucuya gönder
          await sendUserData(userData);
        } else {
          console.error("WebApp.initDataUnsafe mevcut değil veya kullanıcı verileri alınamadı.");
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
      } finally {
        // 5 saniye bekledikten sonra yüklenmeyi bitir ve oyun bileşenini göster
        setTimeout(() => {
          setLoading(false);
          setShowGame(true);
        }, 5000); // 5 saniye
      }
    };

    fetchUserData();
    console.log("WebApp.initDataUnsafe:", WebApp.initDataUnsafe);

    // Ekranı tam ekran yap
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'mining':
        return <Mining />;
      case 'inventory':
        return <Inventory />;
      case 'stats':
        return <Stats />;
      case 'guild':
        return <Guild />;
      case 'dungeon':
        return <Dungeon />;
      case 'game':
      default:
        return <Game />;
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-green-600 bg-green-800 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        {/* Kullanıcı verisi mevcut değilken bileşen */}
      </main>
    );
  }

  return (
    <main className="pt-16 pb-16 flex flex-col items-center justify-center min-h-screen overflow-auto">
      <Header />
      <div className="w-full max-w-4xl p-4">
        {showGame ? renderActiveComponent() : null}
      </div>
      <BottomNav onNavItemClick={setActiveComponent} currentPath={activeComponent} />
    </main>
  );
}

export default App;
