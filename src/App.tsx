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
    const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/userdata', {
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
          await sendUserData(userData); // API'ye kullanıcı verisini gönder
        } else {
          console.error("WebApp.initDataUnsafe mevcut değil veya kullanıcı verileri alınamadı.");
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    console.log("WebApp.initDataUnsafe:", WebApp.initDataUnsafe);
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

  return (
    <>
      {loading ? (
        <main className="flex items-center justify-center h-screen p-4">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-green-600 bg-green-800 rounded-full animate-spin"></div>
        </main>
      ) : userData ? (
        <main className="pt-16 pb-16 flex flex-col items-center justify-center min-h-screen overflow-auto">
          <Header />
          <div className="w-full max-w-4xl p-4">
            {renderActiveComponent()}
          </div>

          <BottomNav onNavItemClick={setActiveComponent} currentPath={activeComponent} />
        </main>
      ) : (
        <main className="flex items-center justify-center h-screen p-4">
          <div>Kullanıcı verisi mevcut değil.</div>
        </main>
      )}
    </>
  );
}

export default App;
