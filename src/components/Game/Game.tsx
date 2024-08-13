import React, { useState } from 'react';
import Boss from './Boss';
import Profile from './../Profile/Profile'; // Profile bileşenini import ediyoruz
import Boost from './Boost'; // Boost bileşenini import ediyoruz

const Game: React.FC = () => {
  const [energy, setEnergy] = useState(100);
  const [, setTotalCoins] = useState(0);

  const handleBossClick = () => {
    if (energy > 0) {
      setEnergy((prevEnergy) => Math.max(prevEnergy - 10, 0));
    }
  };

  const handleBossDeath = (coinAmount: number) => {
    setTotalCoins((prevCoins) => prevCoins + coinAmount);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Profil bileşeni */}
      <Profile />

      {/* Boost bileşeni */}
      <Boost />

      {/* Boss component */}
      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />
    </div>
  );
};

export default Game;
