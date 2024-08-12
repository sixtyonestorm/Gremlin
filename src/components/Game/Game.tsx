import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const Game: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Kullanıcı adı state
  const [coin, setCoin] = useState<number>(0); // Coin state
  const [userId, setUserId] = useState<number | null>(null); // Dinamik kullanıcı ID'si

  useEffect(() => {
    // Kullanıcı ID'sini almak için API çağrısı
    const fetchUserId = async () => {
      try {
        const response = await axios.get('https://greserver-b4a1eced30d9.herokuapp.com/getuserid'); // Bu endpoint'ten kullanıcı ID'sini alıyoruz
        const userId = response.data.userId;
        setUserId(userId); // Alınan kullanıcı ID'sini state'e ata
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // User ID değiştiğinde kullanıcı verilerini al
    const fetchUserData = async () => {
      if (userId === null) return; // Eğer userId yoksa, işleme devam etme

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
  }, [userId]); // userId değiştiğinde kullanıcı verilerini güncelle

  const handleBossClick = () => {
    // Boss click işlemi yapılacaksa
  };

  const handleBossDeath = (coinAmount: number) => {
    setCoin((prevCoin) => prevCoin + coinAmount); // Coin miktarını ekle

    // Coin güncellemesini backend'e gönder
    const updateCoin = async () => {
      try {
        if (userId !== null) {
          await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/updatecoin', { id: userId, coin: coinAmount });
        }
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
      {userId !== null && (
        <Profile username={username} totalCoins={coin} />
      )}
    </div>
  );
};

export default Game;
