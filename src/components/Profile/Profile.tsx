import React, { useState } from 'react';
import ProfilePopup from './ProfilePopup'; // ProfilePopup bileşenini import ettik
import profileWebp from '../../icons/profile.webp'; // WebP dosyasının yolunu import et

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
        className="fixed top-[65px] left-4 flex flex-col items-center cursor-pointer z-50"
        onClick={handleProfileClick} // Profil bileşenine tıklandığında popup görünür
      >
        {/* Profil simgesi */}
        <div className="relative rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <img src={profileWebp} alt="Profile" className="w-12 h-12" /> {/* WebP'yi img etiketi ile kullan */}
        </div>
        <span className="text-white text-xs font-bold mt-[-2px] text-shadow-md">Character</span> {/* Boost adı */}
        </div>

      {/* ProfilePopup açıldığında görünür */}
      {isPopupVisible && (
        <ProfilePopup isVisible={isPopupVisible} onClose={handlePopupClose} userId={0} />
      )}
    </div>
  );
};

export default Profile;