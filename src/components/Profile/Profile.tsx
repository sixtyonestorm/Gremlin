import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // FaUser ikonunu import ettik
import ProfilePopup from './ProfilePopup'; // ProfilePopup bileşenini import ettik

const Profile: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleProfileClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="fixed top-[65px] left-6 flex flex-col items-center cursor-pointer z-50"
        onClick={handleProfileClick} // Profil bileşenine tıklandığında popup görünür
      >
        {/* Profil simgesi */}
        <div className="bg-gradient-to-br from-red-700 via-yellow-500 to-black rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <FaUser className="text-white text-lg" />
        </div>
        <span className="text-white text-xs mt-1">Stats</span> {/* Profil adı */}
      </div>

      {/* ProfilePopup açıldığında görünür */}
      {isPopupVisible && (
        <ProfilePopup isVisible={isPopupVisible} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Profile;
