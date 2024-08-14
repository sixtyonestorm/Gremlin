import React from 'react';

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  // Sample upgrade function
  const handleUpgrade = (boostName: string) => {
    // Logic to handle upgrade action
    console.log(`Upgrading: ${boostName}`);
    // You can add actual upgrade logic here, such as making API calls
    // or updating state based on the selected boost
  };

  const boosts = [
    { name: 'Click Power', cost: 'XX coins' },
    { name: 'Countdown Killer', cost: 'XX coins' },
    { name: 'Coin Booster', cost: 'XX coins' },
    { name: 'Auto Gremlin Killer (1 day)', cost: 'XX coins' },
    { name: 'Auto Gremlin Killer (2 day)', cost: 'XX coins' },
    { name: 'Auto Gremlin Killer (3 day)', cost: 'XX coins' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-gray-900 bg-opacity-40">
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-black p-4 rounded-lg shadow-2xl w-full max-w-xs">
        <h2 className="text-lg font-bold text-yellow-400 mb-3 text-center">Available Boosts</h2>
        <ul className="space-y-2">
          {boosts.map((boost, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gradient-to-r from-green-900 via-green-800 to-green-700 p-3 rounded-lg shadow-md text-gray-200 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleUpgrade(boost.name)}
            >
              <span>{boost.name}</span>
              <span>{boost.cost}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPopup;
