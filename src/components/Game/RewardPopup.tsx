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
        className="bg-gradient-to-br from-green-800 via-green-700 to-black border border-green-600 shadow-lg flex flex-col items-center justify-center"
        style={{
          width: '180px', // Reduced width and height
          height: '180px',
          borderRadius: '50%', // Perfect circle
          padding: '10px', // Reduced padding
        }}
      >
        <h2 className="text-lg font-extrabold text-white mb-1 text-center">
          Victory!
        </h2>
        <p className="text-sm text-gray-300 mb-1 text-center">
          You defeated the boss!
        </p>
        <p className="text-sm text-gray-300 mb-1 text-center">
          <span className="font-semibold text-yellow-400 text-xl">{coin}</span> coins
        </p>
        <p className="text-sm text-gray-300 mb-3 text-center">
          <span className="font-semibold text-blue-400 text-xl">{experience}</span> XP
        </p>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-400 transition duration-300 ease-in-out"
          style={{
            width: '100px', // Reduced width for the button
            height: '30px',
            borderRadius: '15px', // More rounded button
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default RewardPopup;
