import { useEffect, useState } from 'react';
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
  // Bu fonksiyon sadece API'ye veri gönderir, şu an yerel test için devre dışı bırakabilirsiniz
  // const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/user-data', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(userData),
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to send user data');
  // }

  // const result = await response.json();
  // console.log('User data sent successfully:', result);
  console.log('User data simulated successfully:', userData);
};

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string>('game');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simüle edilmiş kullanıcı verilerini burada oluşturun
        const simulatedUserData: UserData = {
          id: 12345,
          first_name: 'John',
          last_name: 'Doe',
          username: 'GremlinKiller145',
          language_code: 'en',
          is_premium: false,
        };
        
        // Simüle edilmiş kullanıcı verisini state'e ayarla
        setUserData(simulatedUserData);
        
        // Kullanıcı verilerini 'gönder' (simülasyon)
        await sendUserData(simulatedUserData);
      } catch (error) {
        console.error('Kullanıcı verileri alınırken bir hata oluştu:', error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowGame(true);
        }, 10000);
      }
    };

    fetchUserData();
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
        {!showGame ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-lg text-gray-600">Kullanıcı verileri:</p>
            <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded-lg border border-gray-300">
              {JSON.stringify(userData, null, 2)}
            </pre>
            <p className="text-sm text-gray-500 mt-4">10 saniye bekleyin...</p>
          </div>
        ) : (
          renderActiveComponent()
        )}
      </div>
      <BottomNav onNavItemClick={setActiveComponent} currentPath={activeComponent} />
    </main>
  );
}

export default App;
