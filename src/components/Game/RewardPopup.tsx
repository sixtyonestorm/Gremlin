import React, { useEffect, useRef } from 'react';
import { animatePopup } from './utils/popupanimations'; // Updated path

interface RewardPopupProps {
  isVisible: boolean;
  onClose: () => void;
  coin: number;
  experience: number;
}

const RewardPopup: React.FC<RewardPopupProps> = ({ isVisible, onClose, coin, experience }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-6 border border-green-600 shadow-lg"
        style={{
          width: '320px',
          height: '180px',
          borderRadius: '160px / 90px', // Soft ellipse shape
        }}
      >
        <h2 className="text-2xl font-extrabold text-white mb-4 text-center">
          Victory!
        </h2>
        <p className="text-lg text-gray-300 mb-2 text-center">
          You defeated the boss!
        </p>
        <p className="text-lg text-gray-300 mb-2 text-center">
          <span className="font-semibold text-yellow-400 text-2xl">{coin}</span> coins
        </p>
        <p className="text-lg text-gray-300 mb-4 text-center">
          <span className="font-semibold text-blue-400 text-2xl">{experience}</span> XP
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardPopup;
