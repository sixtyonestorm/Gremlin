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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-gray-800 p-4 rounded-lg shadow-md max-w-xs w-full"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-2 text-center">
          Victory!
        </h2>
        <p className="text-sm text-gray-300 mb-3 text-center">
          You defeated the boss!
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-yellow-400">Coins</span>
          <span className="font-semibold text-yellow-400">+{coin}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-400">Experience</span>
          <span className="font-semibold text-blue-400">+{experience} XP</span>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
}

export default RewardPopup;