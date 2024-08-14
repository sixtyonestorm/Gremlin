import React, { useState } from 'react';
import GiftCodePopup from './GiftCodePopup'; // GiftCodePopup bileşenini import ettik
import giftWebp from '../../icons/giftbox.webp'; // Aynı WebP dosyasını kullanabilirsiniz veya uygun bir dosya ekleyin

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
        onClick={handleGiftKeyClick} // Hediye kodu bileşenine tıklandığında popup görünür
      >
        {/* Hediye kodu simgesi */}
        <div className="relative rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <img src={giftWebp} alt="Gift Key" className="w-12 h-12" /> {/* WebP'yi img etiketi ile kullan */}
        </div>
        <span className="text-white text-xs font-bold mt-[-3px] text-shadow-md">SurpriseBox</span> {/* Hediye kodu adı */}
      </div>

      {/* GiftCodePopup açıldığında görünür */}
      {isPopupVisible && (
        <GiftCodePopup isVisible={isPopupVisible} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default GiftKey;
