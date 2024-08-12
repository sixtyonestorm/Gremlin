import React, { useState } from 'react';
import Boss from './Boss';

const Game: React.FC = () => {
  const [energy, setEnergy] = useState(100);
  const [, setTotalCoins] = useState(0); // Total coins state

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
    </div>
  );
};

export default Game;
