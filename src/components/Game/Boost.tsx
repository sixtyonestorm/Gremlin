import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa'; // Rocket icon
import BoostPopup from './BoostPopup'; // BoostPopup component

interface BoostProps {
  boostLevel: number;
}

const Boost: React.FC<BoostProps> = ({ boostLevel }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleBoostClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const upgradeOptions = [
    { name: 'Daily Booster 1', description: 'Boosts daily performance.' },
    { name: 'Daily Booster 2', description: 'Increases daily rewards.' },
    { name: 'Daily Booster 3', description: 'Provides extra bonuses daily.' },
    { name: 'Boost 1', description: 'Increases click damage.', cost: 200 },
    { name: 'Boost 2', description: 'Improves click efficiency.', cost: 250 },
    { name: 'Boost 3', description: 'Enhances overall performance.', cost: 300 },
    { name: 'Boost 4', description: 'Provides temporary multipliers.', cost: 350 },
    { name: 'Boost 5', description: 'Permanent damage increase.', cost: 400 },
  ];

  return (
    <div className="relative">
      <div
        className="fixed top-16 right-4 flex flex-col items-center space-y-1 cursor-pointer z-50 translate-y-0.5" // Slight downward shift
        onClick={handleBoostClick}
      >
        <div className="flex items-center justify-center p-1 rounded-full">
          <FaRocket size={20} className="text-yellow-500" />
        </div>
        <span className="text-xs font-medium text-white">Booster (Level: {boostLevel})</span>
      </div>
      <BoostPopup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        upgrades={upgradeOptions}
      />
    </div>
  );
};

export default Boost;
