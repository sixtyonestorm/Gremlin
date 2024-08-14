import React, { useState } from 'react';
import GiftCodePopup from './GiftCodePopup'; // GiftCodePopup component
import giftWebp from '../../icons/giftbox.webp'; // Import the giftbox image

const GiftKey: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleGiftKeyClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="fixed top-[135px] right-4 flex flex-col items-center cursor-pointer z-50"
        onClick={handleGiftKeyClick} // Show popup on click
      >
        {/* Gift icon with styling similar to BoostPopup */}
        <div className="relative rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
          <img src={giftWebp} alt="Gift Key" className="w-12 h-12" />
        </div>
        <span className="text-yellow-400 text-xs font-bold mt-1">SurpriseBox</span>
      </div>

      {/* Render GiftCodePopup when visible */}
      {isPopupVisible && (
        <GiftCodePopup isVisible={isPopupVisible} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default GiftKey;
