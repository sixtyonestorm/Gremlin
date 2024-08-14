import React, { useState } from 'react';
import profileWebp from '../../icons/boost.webp'; // WebP dosyasının yolunu import et
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
        className="fixed top-[65px] right-4 flex flex-col items-center cursor-pointer z-50"
        onClick={handleBoostClick} // Boost bileşenine tıklandığında popup görünür
      >
        {/* Boost simgesi */}
        <div className="relative rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <img src={profileWebp} alt="Boost" className="w-9 h-9" /> {/* WebP'yi img etiketi ile kullan */}
        </div>
        <span className="text-white text-xs font-bold mt-[-2px] text-shadow-md">Supercharge</span> {/* Boost adı */}
      </div>

      {/* BoostPopup açıldığında görünür */}
      {isPopupVisible && (
        <BoostPopup isVisible={isPopupVisible} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Boost;
