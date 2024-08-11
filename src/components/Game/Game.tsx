import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const Game: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Kullanıcı adı state
  const [totalCoins, setTotalCoins] = useState<number>(0); // Toplam coin state

  // Sabit kullanıcı ID'si
  const userId = 1655796423;

  useEffect(() => {
    // API'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
        const userData = response.data;

        // Kullanıcı adı ve toplam coinleri state'e ata
        setUsername(userData.username || ''); // Varsayılan kullanıcı adı
        setTotalCoins(userData.coin || 0); // Toplam coin
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Boş bağımlılık dizisi, component mount olduğunda çalışır

  const handleBossClick = () => {
    // Boss tıklama işlemleri burada yapılır
  };

  const handleBossDeath = (coinAmount: number) => {
    setTotalCoins((prevCoins) => prevCoins + coinAmount); // Coin ekle
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />
      <Profile username={username} totalCoins={totalCoins} />
    </div>
  );
};

export default Game;
