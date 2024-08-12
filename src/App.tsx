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

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState<string>('game'); // default olarak 'game' bileşenini ayarla
  const [showGame, setShowGame] = useState(false); // Oyun ekranını kontrol etmek için state ekleyelim

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
        } else {
          console.error("WebApp.initDataUnsafe mevcut değil veya kullanıcı verileri alınamadı.");
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
        // 10 saniye bekledikten sonra oyun bileşenini göster
        setTimeout(() => {
          setShowGame(true);
        }, 10000); // 10 saniye
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

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-green-600 bg-green-800 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Kullanıcı verileri yükleniyor...</p>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4">
        <p className="text-lg text-gray-600">Kullanıcı verisi mevcut değil. Lütfen tekrar deneyin.</p>
      </main>
    );
  }

  return (
    <main className="pt-16 pb-16 flex flex-col items-center justify-center min-h-screen overflow-auto">
      <Header />
      <div className="w-full max-w-4xl p-4">
        {showGame ? renderActiveComponent() : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-lg text-gray-600">Kullanıcı verileri alındı. Oyun açılacak...</p>
            <p className="text-sm text-gray-500">10 saniye bekleyin...</p>
          </div>
        )}
      </div>
      <BottomNav onNavItemClick={setActiveComponent} currentPath={activeComponent} />
    </main>
  );
}

export default App;
