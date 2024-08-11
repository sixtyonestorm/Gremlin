import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et

const generateRandomUsername = () => {
  return `Gremlin${Math.floor(Math.random() * 10000)}`;
};

const Game: React.FC = () => {
  const [energy, setEnergy] = useState(100);
  const [username, setUsername] = useState<string>(""); // Kullanıcı adı state
  const [, setTotalCoins] = useState(0); // Total coins state

  useEffect(() => {
    // API'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://greserver-b4a1eced30d9.herokuapp.com/userdata'); // API endpoint'ini güncelledik
        const userData = response.data;

        // Eğer username varsa onu kullan, yoksa rastgele bir kullanıcı adı atayın
        if (userData.username) {
          setUsername(userData.username);
        } else {
          setUsername(generateRandomUsername());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername(generateRandomUsername()); // API çağrısı sırasında hata olursa rastgele kullanıcı adı atayın
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
