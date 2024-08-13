import React, { useEffect, useRef, useState } from 'react';
import { animatePopup } from '../Game/utils/popupanimations';

interface BoostPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BoostPopup: React.FC<BoostPopupProps> = ({ isVisible, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [mousePowerLevel, setMousePowerLevel] = useState(1);
  const [attackSpeedLevel, setAttackSpeedLevel] = useState(1);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // Yükseltme maliyetleri ve Killer Slave bilgileri
  const upgradeCosts = {
    mousePower: mousePowerLevel * 50,
    attackSpeed: attackSpeedLevel * 30,
    killerSlaves: [
      { name: 'Common Killer Slave', power: 5, bossesPerDay: 5, cost: 100 },
      { name: 'Rare Killer Slave', power: 10, bossesPerDay: 10, cost: 250 },
      { name: 'Epic Killer Slave', power: 20, bossesPerDay: 20, cost: 500 },
      { name: 'Legend Killer Slave', power: 40, bossesPerDay: 40, cost: 1000 },
    ],
  };

  const handleUpgrade = (type: 'mousePower' | 'attackSpeed') => {
    if (type === 'mousePower') {
      setMousePowerLevel(prev => prev + 1);
    } else if (type === 'attackSpeed') {
      setAttackSpeedLevel(prev => prev + 1);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleKillerSlavePurchase = (_index?: number) => {
    // İlgili işlemler burada yapılacak
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-2 bg-gray-800 bg-opacity-60">
      <div
        ref={popupRef}
        className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-2xl w-full max-w-3xl h-auto overflow-auto animate-scale-up"
      >
        <h2 className="text-lg font-bold text-blue-400 mb-4 text-center">
          Upgrade Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Mouse Power */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-green-300 mb-2">Mouse Power</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-300">Level {mousePowerLevel}</span>
              <button
                onClick={() => handleUpgrade('mousePower')}
                className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-300 transition duration-300 ease-in-out text-xs"
              >
                Upgrade
              </button>
            </div>
            <p className="text-gray-400 text-xs">
              Increases mouse clicking power. Higher levels improve efficiency.
            </p>
          </div>

          {/* Attack Speed */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-green-300 mb-2">Attack Speed</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-300">Level {attackSpeedLevel}</span>
              <button
                onClick={() => handleUpgrade('attackSpeed')}
                className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-300 transition duration-300 ease-in-out text-xs"
              >
                Upgrade
              </button>
            </div>
            <p className="text-gray-400 text-xs">
              Increases the speed at which attacks are performed. Higher levels increase attack speed.
            </p>
          </div>

          {/* Killer Slaves */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-green-300 mb-2">Killer Slaves</h3>
            {upgradeCosts.killerSlaves.map((slave, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="text-blue-300 font-semibold">{slave.name}</span>
                  <span className="text-gray-400 text-xs">Power: {slave.power}</span>
                  <span className="text-gray-400 text-xs">Bosses/Day: {slave.bossesPerDay}</span>
                </div>
                <button
                  onClick={() => handleKillerSlavePurchase(index)}
                  className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-300 transition duration-300 ease-in-out text-xs"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPopup;
