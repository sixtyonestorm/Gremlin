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
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-2 bg-black bg-opacity-70">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-900 to-green-700 p-3 rounded-lg shadow-lg w-full max-w-xs border border-yellow-500"
      >
        <h2 className="text-lg font-bold text-yellow-400 mb-2 text-center">Player Stats</h2>
        <ul className="space-y-1">
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Username:</span>
              <span className="text-yellow-300 font-semibold">{userData.username || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Level:</span>
              <span className="text-yellow-300 font-semibold">{userData.level || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">XP:</span>
              <span className="text-yellow-300 font-semibold">{userData.total_exp || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Power:</span>
              <span className="text-purple-300 font-semibold">{userData.attack_power || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Boss Coins:</span>
              <span className="text-purple-300 font-semibold">{userData.mined_boss_coin || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Quests:</span>
              <span className="text-purple-300 font-semibold">{userData.mined_quests_coin || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Dungeon:</span>
              <span className="text-purple-300 font-semibold">{userData.mined_dungeon_coin || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Referral:</span>
              <span className="text-purple-300 font-semibold">{userData.mined_ref_coin || 'N/A'}</span>
            </div>
          </li>
          <li className="bg-green-800 p-2 rounded text-xs text-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Total:</span>
              <span className="text-purple-300 font-semibold">{userData.total_mined_coin || 'N/A'}</span>
            </div>
          </li>
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

export default ProfilePopup;
