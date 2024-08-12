import React from 'react';

interface ProfilePopupProps {
  username: string;
  totalCoins: number;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ username, totalCoins, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">{username}</h2>
        <p className="text-lg">Total Coins: {totalCoins}</p> {/* Coin miktarını gösteriyoruz */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
