import React, { useState, useEffect } from 'react';
import Boss from './Boss';
import Profile from '../Profile/Profile'; // Profil bileşenini import et
import axios from 'axios'; // HTTP istekleri için axios kullanacağız

const Game: React.FC = () => {
  const [energy, setEnergy] = useState(100);
  const [username, setUsername] = useState<string | null>(null); // Dinamik username
  const [, setTotalCoins] = useState(0); // Total coins state
  const userId = 1; // Kullanıcı ID'sini burada ayarlayın. Dinamik olarak alabilirsiniz.

  useEffect(() => {
    // Kullanıcı adı almak için API çağrısı
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/userdata/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

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

      {/* Boost component */}

      {/* Profil bileşeni */}
      <Profile username={username || 'Loading...'} />
    </div>
  );
};

export default Game;
