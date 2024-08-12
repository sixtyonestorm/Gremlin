import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Profil ikonunu içe aktar
import ProfilePopup from './ProfilePopup'; // Profil popup bileşenini içe aktar

interface ProfileProps {
  username: string;
  totalCoins: number; // Total coins state'i ekle
}

const Profile: React.FC<ProfileProps> = ({ username, totalCoins }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup görünürlük state'i

  const handleProfileClick = () => {
    setIsPopupVisible(true); // Profil simgesine tıklandığında popup'ı göster
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // Popup'ı kapat
  };

  return (
    <div className="absolute top-4 left-4 flex flex-col items-center space-y-1 cursor-pointer z-50">
      <div
        className="flex items-center justify-center p-1 rounded-full bg-gray-800"
        onClick={handleProfileClick} // Tıklama olayını tetikler
      >
        <FaUser size={20} className="text-white" />
      </div>
      <span className="text-xs font-medium text-white">{username}</span>

      {/* Profil popup'ını göstermek için state'e göre render et */}
      {isPopupVisible && (
        <ProfilePopup username={username} totalCoins={totalCoins} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Profile;
