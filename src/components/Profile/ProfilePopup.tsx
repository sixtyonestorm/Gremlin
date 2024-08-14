import React, { useEffect, useRef } from 'react';
import { animatePopup } from '../Game/utils/popupanimations';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  attack_power: number | undefined;
  level: number | undefined;
  total_exp: number | undefined;
  mined_boss_coin: number | undefined;
  mined_mining_coin: number | undefined;
  mined_quests_coin: number | undefined;
  mined_dungeon_coin: number | undefined;
  mined_ref_coin: number | undefined;
  total_mined_coin: number | undefined;
}

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
  userData: UserData;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose, userData }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      popupRef.current.style.opacity = "1";
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black bg-opacity-70">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-900 to-green-700 p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-yellow-500"
      >
        <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">Player Stats</h2>
        <ul className="space-y-2">
          {Object.entries(userData).map(([key, value]) => {
            const label = key.replace(/_/g, ' ').toUpperCase();
            const displayValue = value !== undefined ? value : 'N/A';
            const valueColor = key.includes('coin') || key.includes('power') ? 'text-purple-300' : 'text-yellow-300';

            return (
              <li key={key} className="bg-green-800 p-3 rounded text-sm text-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-blue-300 font-medium">{label}:</span>
                  <span className={`font-semibold ${valueColor}`}>{displayValue}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
