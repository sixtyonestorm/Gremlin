import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { animateBossClick } from './utils/bossanimations';
import HealthBar from './HealthBar';
import RewardPopup from './RewardPopup';
import usePortalAnimation from './utils/portalAnimation';

interface BossData {
  _id: string;
  spid: number;
  name: string;
  health: number;
  imageSrc: string;
  coinAmount: number;
  experienceAmount: number;
}

interface UserData {
  id: string;
  attack_power: number;
  mined_boss_coin: number;
  Experience: number;
}

const Boss: React.FC = () => {
  const [bossData, setBossData] = useState<BossData | null>(null);
  const [currentHealth, setCurrentHealth] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [rewardData, setRewardData] = useState({ coin: 0, experience: 0 });
  const [userData, setUserData] = useState<UserData | null>(null);

  const {
    outerCircleRef,
    middleCircleRef,
    innerCircleRef,
    centerLightRef
  } = usePortalAnimation();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>('https://greserver-b4a1eced30d9.herokuapp.com/api/user'); // Update with actual user ID
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch a random boss from the API
    const fetchRandomBoss = async () => {
      try {
        const response = await axios.get<BossData[]>('https://greserver-b4a1eced30d9.herokuapp.com/api/bosses');
        const bosses = response.data;
        if (bosses.length > 0) {
          const randomIndex = Math.floor(Math.random() * bosses.length);
          const selectedBoss = bosses[randomIndex];
          setBossData(selectedBoss);
          setCurrentHealth(selectedBoss.health);
        }
      } catch (error) {
        console.error('Error fetching bosses:', error);
      }
    };

    fetchRandomBoss();
  }, []);

  useEffect(() => {
    if (bossData && currentHealth <= 0) {
      handleBossDeath();
    }
  }, [currentHealth, bossData]);

  const handleClick = async () => {
    if (currentHealth > 0 && bossData && userData) {
      const { attack_power } = userData;
      const newHealth = currentHealth - attack_power;

      if (newHealth <= 0) {
        setCurrentHealth(0);
        setRewardData({
          coin: bossData.coinAmount,
          experience: bossData.experienceAmount,
        });
        setIsPopupVisible(true);

        // Update user data with rewards
        try {
          await axios.put(`https://greserver-b4a1eced30d9.herokuapp.com/api/user/${userData.id}`, {
            mined_boss_coin: userData.mined_boss_coin + bossData.coinAmount,
            Experience: userData.Experience + bossData.experienceAmount,
          });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      } else {
        setCurrentHealth(newHealth);
      }

      const bossElement = document.querySelector('.boss-image') as HTMLElement;
      if (bossElement) {
        animateBossClick(bossElement);
      }
    }
  };

  const handleBossDeath = async () => {
    try {
      // Fetch a new random boss from the API
      const response = await axios.get<BossData[]>('https://greserver-b4a1eced30d9.herokuapp.com/api/bosses');
      const bosses = response.data;
      if (bosses.length > 0) {
        const randomIndex = Math.floor(Math.random() * bosses.length);
        const selectedBoss = bosses[randomIndex];
        setBossData(selectedBoss);
        setCurrentHealth(selectedBoss.health);
      }
    } catch (error) {
      console.error('Error fetching new boss:', error);
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      {bossData && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-white">
            {bossData.name}
          </h2>
          <HealthBar hp={currentHealth} maxHp={bossData.health} />
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
              src={bossData.imageSrc}
              alt={`Boss ${bossData.spid}`}
              width={280}
              height={280}
              className="cursor-pointer boss-image"
              onClick={handleClick}
            />
          </div>

          <RewardPopup
            isVisible={isPopupVisible}
            onClose={handlePopupClose}
            coin={rewardData.coin}
            experience={rewardData.experience}
          />
        </>
      )}
    </div>
  );
};

export default Boss;
