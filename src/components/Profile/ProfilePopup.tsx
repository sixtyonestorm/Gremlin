import React from 'react';

interface ProfilePopupProps {
  username: string;
  totalCoins: number; // Total coins ekliyoruz
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ username, totalCoins, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p className="text-gray-700">Username: {username}</p>
        <p className="text-gray-700">Total Coins: {totalCoins}</p> {/* Total coins'ı ekledik */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
