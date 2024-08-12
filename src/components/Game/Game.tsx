import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const Game: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Kullanıcı adı state
  const [coin, setCoin] = useState<number>(0); // Coin state
  const [userId, setUserId] = useState<number | null>(null); // Kullanıcı ID state'i
  const [loading, setLoading] = useState<boolean>(true); // Yüklenme durumu

  useEffect(() => {
    // Kullanıcı ID'sini API'den al
    const fetchUserId = async () => {
      try {
        const response = await axios.get('https://greserver-b4a1eced30d9.herokuapp.com/getUserId');
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      // Kullanıcı verilerini API'den al
      const fetchUserData = async () => {
        try {
          const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
          const userData = response.data;

          setUsername(userData.username || 'Unknown');
          setCoin(userData.coin || 0);
          setLoading(false); // Veriler alındı, yüklenmeyi tamamla
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUsername('Unknown');
          setLoading(false); // Hata durumunda da yüklenmeyi tamamla
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleBossClick = () => {
    // Boss click işlemi yapılacaksa
  };

  const handleBossDeath = (coinAmount: number) => {
    setCoin((prevCoin) => prevCoin + coinAmount);

    // Coin güncellemesini backend'e gönder
    const updateCoin = async () => {
      try {
        await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/updatecoin', { id: userId, coin: coinAmount });
      } catch (error) {
        console.error('Error updating coin:', error);
      }
    };

    updateCoin();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Boss component */}
      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />

      {/* Boost component */}

      {/* Profil bileşeni */}
      {!loading && <Profile username={username} totalCoins={coin} />}
    </div>
  );
};

export default Game;
