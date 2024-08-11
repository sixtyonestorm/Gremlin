import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const Game: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Kullanıcı adı state
  const [coin, setCoin] = useState<number>(0); // Coin state
  const userId = 1655796423; // Sabit kullanıcı ID'si

  useEffect(() => {
    // API'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
        const userData = response.data;

        // Eğer username varsa state'e ata
        setUsername(userData.username || 'Unknown');
        setCoin(userData.coin || 0); // Toplam coinleri state'e ata
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername('Unknown'); // API çağrısı sırasında hata olursa varsayılan kullanıcı adı ata
      }
    };

    fetchUserData();
  }, [userId]);

  const handleBossClick = () => {
    // Boss click işlemi yapılacaksa
  };

  const handleBossDeath = (coinAmount: number) => {
    setCoin((prevCoin) => prevCoin + coinAmount); // Coin miktarını ekle

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

      {/* Profil bileşeni */}
      <Profile username={username} totalCoins={coin} />
    </div>
  );
};

export default Game;
