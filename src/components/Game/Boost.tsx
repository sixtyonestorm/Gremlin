import React, { useState } from 'react';
import BoostPopup from './BoostPopup'; // BoostPopup bileşenini import et

interface Boost {
  name: string;
  description: string;
  cost: number;
}

interface BoostProps {
  boosts: Boost[]; // Boost seçeneklerini al
}

const Boost: React.FC<BoostProps> = ({ boosts }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleBoostClick = () => {
    setIsPopupVisible(true); // Boost butonuna tıklandığında popup'ı göster
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Popup'ı kapat
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 font-orbitron">
      {/* Boost Button */}
      <button
        onClick={handleBoostClick}
        className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-purple-700 transition duration-300 ease-in-out text-lg"
      >
        View Boosts
      </button>

      {/* Boost Popup */}
      <BoostPopup isVisible={isPopupVisible} onClose={handleClosePopup} upgrades={boosts} />
    </div>
  );
};

export default Boost;
