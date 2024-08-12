import React, { useState } from 'react';
import { FaUser, FaFire, FaStar, FaCog } from 'react-icons/fa'; // Profil, ateş, yıldız ve dişli ikonları
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
      {/* Profil ikonu ve metin */}
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaUser className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1 drop-shadow-md">Gremlin1461</span>
      </div>

      {/* Ateş ikonu ve metin */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaFire className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1 drop-shadow-md">Booster</span>
      </div>

      {/* Yıldız ikonu ve metin */}
      <div className="absolute top-20 left-4 flex flex-col items-center">
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaStar className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1 drop-shadow-md">Achievements</span>
      </div>

      {/* Dişli ikonu ve metin */}
      <div className="absolute top-20 right-4 flex flex-col items-center">
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaCog className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1 drop-shadow-md">Settings</span>
      </div>

      {/* Boss component */}
      <Boss onClick={handleBossClick} onDeath={handleBossDeath} />

      {/* Boost component */}

      {/* Profil bileşeni */}
    </div>
  );
};

export default Game;
