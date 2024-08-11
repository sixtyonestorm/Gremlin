import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const Game: React.FC = () => {
  const [energy, setEnergy] = useState(100);
  const [username, setUsername] = useState<string>(""); // Kullanıcı adı state
  const [, setTotalCoins] = useState(0); // Total coins state

  useEffect(() => {
    // API'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://greserver-b4a1eced30d9.herokuapp.com/userdata'); // API endpoint
        const userData = response.data;

        // Kullanıcı adını state'e ata
        setUsername(userData.username || "LRS"); // Varsayılan kullanıcı adı
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername("LRS"); // API çağrısı sırasında hata olursa varsayılan kullanıcı adı
      }
    };

    fetchUserData();
  }, []);

  const handleBossClick = () => {
    if (energy > 0) {
      setEnergy((prevEnergy) => Math.max(prevEnergy - 10, 0));
    }
  };

  const handleBossDeath = (coinAmount: number) => {
    setTotalCoins((prevCoins) => prevCoins + coinAmount); // Add coins
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Boss component */}
      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />

      {/* Profil bileşeni */}
      <Profile username={username} />
    </div>
  );
};

export default Game;
