import React, { useEffect, useRef } from 'react';
import { animatePopup } from './utils/popupanimations'; // Adjust the path as needed

interface Upgrade {
  name: string;
  description: string;
  cost?: number; // Optional cost property
}

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
  upgrades: Upgrade[];
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose, upgrades }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const dailyBoosters = upgrades.filter(upgrade => !upgrade.cost);
  const otherBoosts = upgrades.filter(upgrade => upgrade.cost);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay to make the background inactive */}
      <div className="absolute inset-0 bg-black opacity-70 z-40" onClick={onClose}></div>
      <div
        ref={popupRef}
        className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-lg shadow-lg max-w-md w-full z-50"
      >
        <h2 className="text-xl font-bold text-white mb-4 text-center">Boosters</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
        >
          &times;
        </button>
        {/* Daily Boosters Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {dailyBoosters.map((upgrade, index) => (
            <div key={index} className="flex-1 min-w-[140px] p-4 bg-gradient-to-r from-green-700 to-green-700 rounded-lg shadow-lg text-center">
              <h3 className="text-sm font-semibold text-white">{upgrade.name}</h3>
              <p className="text-xs text-gray-100">{upgrade.description}</p>
            </div>
          ))}
        </div>
        {/* Other Boosts Section */}
        <div className="overflow-y-auto max-h-[calc(100vh-320px)]">
          {otherBoosts.map((upgrade, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg shadow-md bg-green-800">
              <h3 className="text-sm font-semibold text-white">{upgrade.name}</h3>
              <p className="text-xs text-gray-300">{upgrade.description}</p>
              <span className="block mt-2 text-right text-yellow-300 text-xs">Cost: {upgrade.cost} Coins</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-600 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPopup;
