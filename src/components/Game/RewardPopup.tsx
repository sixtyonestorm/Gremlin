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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div
        ref={popupRef}
        className="bg-green-900 p-4 rounded-lg border-2 border-yellow-500 max-w-xs w-full"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center animate-pulse">
          Level Complete!
        </h2>
        <p className="text-sm text-gray-300 mb-3 text-center">
          Boss defeated! Claim your rewards:
        </p>
        <div className="flex justify-between items-center mb-3 bg-gray-800 p-2 rounded">
          <span className="text-yellow-400 flex items-center">
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            Coins
          </span>
          <span className="font-semibold text-yellow-400">+{coin}</span>
        </div>
        <div className="flex justify-between items-center mb-4 bg-gray-800 p-2 rounded">
          <span className="text-blue-400 flex items-center">
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            XP
          </span>
          <span className="font-semibold text-blue-400">+{experience}</span>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Claim Loot!
        </button>
      </div>
    </div>
  );
}

export default RewardPopup;