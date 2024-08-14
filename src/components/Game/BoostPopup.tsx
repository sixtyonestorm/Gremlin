import React from 'react';

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleUpgrade = (boostName: string) => {
    console.log(`Upgrading: ${boostName}`);
    // Burada yükseltme mantığını uygulayabilirsiniz
  };

  const boosts = [
    { name: 'Click Power', cost: '100', icon: '🖱️' },
    { name: 'Countdown Killer', cost: '200', icon: '⏱️' },
    { name: 'Coin Booster', cost: '300', icon: '💰' },
    { name: 'Auto Gremlin Killer (1 day)', cost: '500', icon: '🗡️' },
    { name: 'Auto Gremlin Killer (2 day)', cost: '900', icon: '⚔️' },
    { name: 'Auto Gremlin Killer (3 day)', cost: '1200', icon: '🛡️' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black bg-opacity-70">
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-lg shadow-2xl w-full max-w-md border-2 border-yellow-500">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center animate-pulse">Power Boosts</h2>
        <ul className="space-y-3">
          {boosts.map((boost, index) => (
            <li
              key={index}
              className="bg-gradient-to-r from-green-800 to-green-700 p-3 rounded-lg shadow-md text-gray-200 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => handleUpgrade(boost.name)}
            >
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="text-2xl mr-2">{boost.icon}</span>
                  <span className="font-semibold">{boost.name}</span>
                </span>
                <span className="bg-yellow-500 text-green-900 px-2 py-1 rounded font-bold text-sm">
                  {boost.cost} 🪙
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPopup;