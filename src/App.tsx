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
  coin?: number;
  invite?: number;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState<string>('game');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/userdata');
        
        if (!response.ok) {
          throw new Error('Ağ yanıtı başarısız oldu');
        }

        const data: UserData = await response.json();
        await sendUserData(data);
        // Gecikme ekle
        setTimeout(() => {
          setUserData(data);
          setLoading(false);
        }, 15000); // 10-15 saniye gecikme
      } catch (error) {
        console.error('Kullanıcı verileri alınırken bir hata oluştu:', error);
        setLoading(false); // Hata durumunda da yükleme durumunu kaldır
      }
    };

    fetchUserData();
  }, []);

  const sendUserData = async (data: UserData) => {
    try {
      const response = await fetch('https://greserver-b4a1eced30d9.herokuapp.com/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ağ yanıtı başarısız oldu');
      }
      console.log('Veri başarıyla gönderildi');
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
    }
  };

  const updateUserData = async (updatedData: Partial<UserData>) => {
    if (userData) {
      const newData = { ...userData, ...updatedData };
      setUserData(newData);
      await sendUserData(newData);
    }
  };

  const handleClick = () => {
    // Örneğin, bir butona tıklandığında kullanıcı bilgisini güncelle
    if (userData) {
      updateUserData({ coin: userData.coin ? userData.coin + 100 : 100 });
    }
  };

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
        <main className="flex flex-col items-center justify-center h-screen p-4">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-green-600 bg-green-800 rounded-full animate-spin"></div>
          <div className="mt-4 text-center">
            <div>Loading user data, please wait...</div>
          </div>
        </main>
      ) : userData ? (
        <main className="pt-16 pb-16 flex flex-col items-center justify-center min-h-screen overflow-auto">
          <Header />
          <div className="w-full max-w-4xl p-4">
            {renderActiveComponent()}
            <button onClick={handleClick}>Add Coins</button> {/* Test butonu */}
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
