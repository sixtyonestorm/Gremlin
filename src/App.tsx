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
    const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/api/user-data', {
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
  const [showGame, setShowGame] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string>('game');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simülasyon verisi oluşturma
        const simulatedUserData: UserData = {
          id: 123,
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          language_code: 'en',
          is_premium: true,
        };

        setUserData(simulatedUserData);
        // Kullanıcı verilerini sunucuya gönder
        await sendUserData(simulatedUserData);
      } catch (error) {
        console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowGame(true);
        }, 5000);
      }
    };

    fetchUserData();
    console.log("WebApp.initDataUnsafe:", WebApp.initDataUnsafe);

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
