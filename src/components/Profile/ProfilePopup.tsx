import React from 'react';

interface ProfilePopupProps {
  username: string;
  totalCoins: number; // Toplam coin miktarı state'i
  onClose: () => void; // Popup'ı kapatmak için fonksiyon
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ username, totalCoins, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
        <p className="text-gray-700">Username: {username}</p>
        <p className="text-gray-700">Total Coins: {totalCoins}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
