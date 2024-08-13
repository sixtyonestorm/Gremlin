import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa'; // Boost simgesi için uygun bir ikon
import BoostPopup from './BoostPopup'; // BoostPopup bileşenini import ediyoruz

const Boost: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleBoostClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="fixed top-[65px] right-6 flex flex-col items-center cursor-pointer z-50"
        onClick={handleBoostClick} // Boost bileşenine tıklandığında popup görünür
      >
        {/* Boost simgesi */}
        <div className="bg-gradient-to-br from-blue-700 via-purple-500 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaRocket className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1">Boost</span> {/* Boost adı */}
      </div>

      {/* BoostPopup açıldığında görünür */}
      {isPopupVisible && (
        <BoostPopup isVisible={isPopupVisible} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Boost;
