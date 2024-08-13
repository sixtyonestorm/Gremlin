import React, { useState } from 'react';
import ProfilePopup from './ProfilePopup'; // ProfilePopup bileşenini import ettik
import profileSvg from '../icons/profile.svg'; // SVG dosyasının yolunu import et

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
          <img src={profileSvg} alt="Profile" className="w-6 h-6" /> {/* SVG'yi img etiketi ile kullan */}
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
