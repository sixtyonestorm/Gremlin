import React from 'react';
import Boss from './Boss';
import Profile from './../Profile/Profile'; // Profile bileşenini import ediyoruz
import Boost from './Boost'; // Boost bileşenini import ediyoruz
import GiftKey from '../GiftCode/GiftCode';
import Level from '../Level/Level'; // Level bileşenini import ediyoruz

const Game: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Profil bileşeni */}
      <Profile />

      {/* Boost bileşeni */}
      <Boost />

      {/* GiftKey bileşeni */}
      <GiftKey />

      {/* Level bileşeni */}
      <Level />

      {/* Boss component */}
      <Boss />
    </div>
  );
};

export default Game;
