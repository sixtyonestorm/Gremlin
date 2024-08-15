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

  const handleShare = () => {
    const shareUrl = 'https://t.me/share/url';
    const botUrl = 'https://t.me/gremlincombatbot'; // Your bot's URL
    const text = `Check out my rewards in the Gremlin Combat game! Coins: ${coin}, XP: ${experience}.`;
    const imageUrl = 'https://i.ibb.co/d7mtqtm/gremlin2.webp'; // Replace with your image URL

    const shareUrlWithParams = `${shareUrl}?url=${encodeURIComponent(botUrl)}&text=${encodeURIComponent(text)}&media=${encodeURIComponent(imageUrl)}`;
    window.open(shareUrlWithParams, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-70">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-4 rounded-lg border-2 border-yellow-500 max-w-xs w-full shadow-lg z-[10000]"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center animate-pulse">
          Victory is yours!
        </h2>
        <p className="text-sm text-green-100 mb-3 text-center">
          Boss defeated! Claim your rewards:
        </p>
        <div className="flex justify-center mb-4">
          <img
            src="https://example.com/path/to/reward-image.png" // Replace with your image URL
            alt="Reward"
            className="w-full h-auto rounded"
          />
        </div>
        <div className="flex justify-between items-center mb-3 bg-green-900 bg-opacity-50 p-2 rounded">
          <span className="text-yellow-300 flex items-center">
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            Coins
          </span>
          <span className="font-semibold text-yellow-300">+{coin}</span>
        </div>
        <div className="flex justify-between items-center mb-4 bg-green-900 bg-opacity-50 p-2 rounded">
          <span className="text-blue-300 flex items-center">
            <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            XP
          </span>
          <span className="font-semibold text-blue-300">+{experience}</span>
        </div>
        <button
          onClick={handleShare}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md mb-2"
        >
          Share on Telegram
        </button>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded hover:from-green-500 hover:to-green-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Claim Loot!
        </button>
      </div>
    </div>
  );
}

export default RewardPopup;
