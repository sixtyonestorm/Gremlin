import React, { useEffect, useRef } from 'react';
import { animatePopup } from '../Game/utils/popupanimations';

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      popupRef.current.style.opacity = "1"; // Başlangıçta opacity değerini 1 olarak ayarlıyoruz.
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-gray-900 bg-opacity-40">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-6 rounded-lg shadow-2xl w-full max-w-sm animate-scale-up relative opacity-1"
      >
        <h2 className="text-2xl font-extrabold text-yellow-400 mb-4 text-center">
          Profile Information
        </h2>
        
        <div className="space-y-4 mb-4 text-base text-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-300">Username:</span>
            <span className="text-yellow-300 font-semibold">Gremlin1461</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-300">Level:</span>
            <span className="text-green-400 font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-300">Experience:</span>
            <span className="text-yellow-300 font-semibold">3456 XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-300">Power:</span>
            <span className="text-red-400 font-semibold">987</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-300">Total Earn:</span>
            <span className="text-purple-300 font-semibold">5678 Coins</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
