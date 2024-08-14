import React, { useState, useEffect } from 'react';
import { animateBossClick } from './utils/bossanimations';
import HealthBar from './HealthBar';
import RewardPopup from './RewardPopup';
import usePortalAnimation from './utils/portalAnimation';
import gremlin1 from '../../../public/images/gremlin1.png';
import gremlin2 from '../../../public/images/gremlin2.png';
import gremlin3 from '../../../public/images/gremlin3.png';

interface BossData {
  id: number;
  name: string;
  health: number;
  imageSrc: string;
  coinAmount: number;
}

const bossDataList: BossData[] = [
  { id: 1, name: 'Gremlin King', health: 200, imageSrc: gremlin1, coinAmount: 100 },
  { id: 2, name: 'Dark Sorcerer', health: 300, imageSrc: gremlin2, coinAmount: 200 },
  { id: 3, name: 'Shadow Beast', health: 150, imageSrc: gremlin3, coinAmount: 300 },
];

const Boss: React.FC = () => {
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [currentHealth, setCurrentHealth] = useState(bossDataList[currentBossIndex].health);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [rewardData, setRewardData] = useState({ damage: 0, coin: 0 });

  const {
    outerCircleRef,
    middleCircleRef,
    innerCircleRef,
    centerLightRef
  } = usePortalAnimation();

  useEffect(() => {
    setCurrentHealth(bossDataList[currentBossIndex].health);
  }, [currentBossIndex]);

  useEffect(() => {
    if (currentHealth <= 0) {
      handleBossDeath();
    }
  }, [currentHealth]);

  const handleClick = () => {
    if (currentHealth > 0) {
      setCurrentHealth(prevHealth => {
        const newHealth = prevHealth - 10;
        if (newHealth <= 0) {
          setCurrentHealth(0);
          setRewardData({
            damage: bossDataList[currentBossIndex].health,
            coin: bossDataList[currentBossIndex].coinAmount,
          });
          setIsPopupVisible(true);
        }
        return newHealth;
      });

      const bossElement = document.querySelector('.boss-image') as HTMLElement;
      if (bossElement) {
        animateBossClick(bossElement);
      }
    }
  };

  const handleBossDeath = () => {
    setCurrentBossIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % bossDataList.length;
      setCurrentHealth(bossDataList[nextIndex].health);
      return nextIndex;
    });
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-2 text-white">
        {bossDataList[currentBossIndex].name}
      </h2>
      <HealthBar hp={currentHealth} maxHp={bossDataList[currentBossIndex].health} />
      <div className="relative flex justify-center items-center">
        <div className="absolute flex items-center justify-center">
          {/* Dış Halka */}
          <div ref={outerCircleRef} className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-700 via-teal-500 to-green-700 opacity-70 shadow-lg" style={{ zIndex: -1 }}></div>
          {/* Orta Halka */}
          <div ref={middleCircleRef} className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-teal-500 via-lime-400 to-teal-500 opacity-60 shadow-lg" style={{ zIndex: -1 }}></div>
          {/* İç Halka */}
          <div ref={innerCircleRef} className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-lime-400 via-yellow-300 to-lime-400 opacity-50 shadow-lg" style={{ zIndex: -1 }}></div>
          {/* Merkez Işık */}
          <div ref={centerLightRef} className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-yellow-300 via-green-200 to-yellow-300 opacity-40 shadow-lg" style={{ zIndex: -1 }}></div>
        </div>

        <img
          src={bossDataList[currentBossIndex].imageSrc}
          alt={`Boss ${bossDataList[currentBossIndex].id}`}
          width={280}
          height={280}
          className="cursor-pointer boss-image"
          onClick={handleClick}
        />
      </div>

      <RewardPopup
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        damage={rewardData.damage}
        coin={rewardData.coin}
      />
    </div>
  );
};

export default Boss;
