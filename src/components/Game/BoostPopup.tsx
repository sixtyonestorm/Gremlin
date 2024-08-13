import React, { useEffect, useRef } from 'react';
import { animatePopup } from '../Game/utils/popupanimations';

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const killerSlaves = [
    { name: 'Common Killer Slave', power: 5, bossesPerDay: 5, cost: 100 },
    { name: 'Rare Killer Slave', power: 10, bossesPerDay: 10, cost: 250 },
    { name: 'Epic Killer Slave', power: 20, bossesPerDay: 20, cost: 500 },
    { name: 'Legend Killer Slave', power: 40, bossesPerDay: 40, cost: 1000 },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleKillerSlavePurchase = (_index?: number) => {
    // İlgili işlemler burada yapılacak
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-2 bg-gray-900 bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-3 rounded-lg shadow-2xl w-full max-w-sm h-auto overflow-auto animate-scale-up"
      >
        <h2 className="text-sm font-bold text-yellow-300 mb-2 text-center">
          Killer Slaves
        </h2>

        <div className="flex flex-col gap-2">
          {killerSlaves.map((slave, index) => (
            <div key={index} className="bg-green-900 p-2 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-blue-300 font-semibold text-xs">{slave.name}</span>
                <span className="text-yellow-300 text-xs">Power: {slave.power}</span>
                <span className="text-yellow-300 text-xs">Bosses/Day: {slave.bossesPerDay}</span>
              </div>
              <button
                onClick={() => handleKillerSlavePurchase(index)}
                className="px-2 py-1 bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out text-xs"
              >
                Kirala
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={onClose}
            className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPopup;
