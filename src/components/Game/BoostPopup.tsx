import React from 'react';

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleUpgrade = (boostName: string) => {
    console.log(`Upgrading: ${boostName}`);
  };

  const boosts = [
    { name: 'Click Power', cost: '100', icon: '🖱️' },
    { name: 'Countdown Killer', cost: '200', icon: '⏱️' },
    { name: 'Coin Booster', cost: '300', icon: '💰' },
    { name: 'Auto Killer (1d)', cost: '500', icon: '🗡️' },
    { name: 'Auto Killer (2d)', cost: '900', icon: '⚔️' },
    { name: 'Auto Killer (3d)', cost: '1200', icon: '🛡️' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-2 bg-black bg-opacity-70">
      <div className="bg-gradient-to-br from-green-900 to-green-700 p-3 rounded-lg shadow-lg w-full max-w-xs border border-yellow-500">
        <h2 className="text-lg font-bold text-yellow-400 mb-2 text-center">Power Boosts</h2>
        <ul className="space-y-1">
          {boosts.map((boost, index) => (
            <li
              key={index}
              className="bg-green-800 p-2 rounded text-xs text-gray-200 cursor-pointer hover:bg-green-700 transition-colors duration-200"
              onClick={() => handleUpgrade(boost.name)}
            >
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="text-sm mr-1">{boost.icon}</span>
                  <span>{boost.name}</span>
                </span>
                <span className="bg-yellow-500 text-green-900 px-1 rounded text-xs font-bold">
                  {boost.cost}🪙
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full mt-2 py-1 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BoostPopup;