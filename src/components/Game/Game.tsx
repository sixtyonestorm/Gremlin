import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import ProfilePopup from '../Profile/ProfilePopup'; // ProfilePopup bileşenini içe aktar
import { FaUser } from 'react-icons/fa'; // Profil ikonunu içe aktar

const Game: React.FC = () => {
  const [username, setUsername] = useState<string>(''); 
  const [coin, setCoin] = useState<number>(0); 
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false); // Profile popup state

  // Sabit kullanıcı ID'si
  const userId = 1655796423;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
        const userData = response.data;

        // Kullanıcı verilerinin doğruluğunu kontrol et
        setUsername(userData.username || 'Unknown');
        setCoin(userData.coin || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername('Unknown');
      }
    };

    fetchUserData();
  }, []);

  const handleBossClick = () => {
    // Boss tıklama işlevini burada tanımlayın
  };

  const handleBossDeath = async (coinAmount: number) => {
    try {
      // Koin miktarını güncelle
      setCoin(prevCoin => prevCoin + coinAmount);

      // Koin güncelleme işlemini yap
      await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/updatecoin', { id: userId, coin: coinAmount });
    } catch (error) {
      console.error('Error updating coin:', error);
    }
  };

  const toggleProfilePopup = () => {
    setIsProfileOpen(prev => !prev); // Profil popup'un açılmasını/kapanmasını yönet
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Profil simgesi ve kullanıcı adı */}
      <div className="absolute top-4 left-4 flex flex-col items-center space-y-1 cursor-pointer" onClick={toggleProfilePopup}>
        <FaUser size={36} className="text-white bg-gray-800 p-2 rounded-full" />
        <span className="text-white text-sm mt-1">{username}</span> {/* Kullanıcı adı */}
      </div>

      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />

      {isProfileOpen && (
        <ProfilePopup username={username} totalCoins={coin} onClose={toggleProfilePopup} />
      )}
    </div>
  );
};

export default Game;
