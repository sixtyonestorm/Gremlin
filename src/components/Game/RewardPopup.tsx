import React, { useEffect, useRef } from 'react';
import { animatePopup } from './utils/popupanimations';

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div
        ref={popupRef}
        className="
          bg-gradient-to-br from-green-900 via-green-800 to-black 
          p-6 rounded-2xl shadow-2xl max-w-sm w-full 
          border-2 border-green-400 
          transform transition-all duration-300 ease-out
          hover:scale-105
        "
        style={{
          boxShadow: `
            0 10px 15px -3px rgba(0, 255, 0, 0.1), 
            0 4px 6px -2px rgba(0, 255, 0, 0.05),
            0 0 0 1px rgba(0, 255, 0, 0.1) inset
          `,
        }}
      >
        {/* Title with glowing effect */}
        <h2 className="
          text-3xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-green-300 to-blue-500 
          mb-4 text-center animate-pulse
        ">
          Victory!
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-300 mb-4 text-center font-semibold">
          You defeated the boss!
        </p>

        {/* Rewards container */}
        <div className="space-y-4 mb-6">
          {/* Coins reward */}
          <div className="
            flex items-center justify-between 
            bg-yellow-900 bg-opacity-50 rounded-full p-3
          ">
            <span className="text-yellow-300 font-bold">Coins</span>
            <span className="
              text-2xl font-bold text-yellow-400 
              bg-yellow-900 bg-opacity-50 rounded-full px-4 py-1
            ">
              +{coin}
            </span>
          </div>

          {/* XP reward */}
          <div className="
            flex items-center justify-between 
            bg-blue-900 bg-opacity-50 rounded-full p-3
          ">
            <span className="text-blue-300 font-bold">Experience</span>
            <span className="
              text-2xl font-bold text-blue-400 
              bg-blue-900 bg-opacity-50 rounded-full px-4 py-1
            ">
              +{experience} XP
            </span>
          </div>
        </div>

        {/* Close button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="
              px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 
              text-black text-lg font-bold rounded-full shadow-lg 
              hover:from-yellow-500 hover:to-yellow-700 
              transition duration-300 ease-in-out
              transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
            "
          >
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardPopup;