import React, { useEffect, useRef } from 'react';
import { animatePopup } from './utils/popupanimations'; // Güncellenmiş yol

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-900 via-green-800 to-black p-6 rounded-lg shadow-2xl max-w-sm w-full border border-green-600"
      >
        <h2 className="text-2xl font-extrabold text-white mb-4 text-center">
          Victory Achieved!
        </h2>
        <p className="text-lg text-gray-300 mb-4 text-center">
          Congratulations! You've defeated the boss and earned rewards.
        </p>
        <p className="text-lg text-gray-300 mb-4 text-center">
          <span className="font-semibold text-yellow-400 text-2xl">{coin}</span> coins!
        </p>
        <p className="text-lg text-gray-300 mb-6 text-center">
          <span className="font-semibold text-blue-400 text-2xl">{experience}</span> experience points!
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out text-md"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardPopup;
