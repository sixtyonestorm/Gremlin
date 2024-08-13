import React, { useState, useEffect } from 'react';
import ProfilePopup from './ProfilePopup'; // ProfilePopup bileşenini import ettik
import profileWebp from '../../icons/profile.webp'; // WebP dosyasının yolunu import et

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const Profile: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // Kullanıcı verilerini saklamak için state

  useEffect(() => {
    // Telegram Web App'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (user) {
          setUserData({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name || '',
            username: user.username || '',
            language_code: user.language_code,
            is_premium: user.is_premium || false,
          });
        }
      } catch (error) {
        console.error("Error fetching user data from Telegram:", error);
      }
    };

    fetchUserData();
  }, []);

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
      {isPopupVisible && userData && (
        <ProfilePopup 
          isVisible={isPopupVisible} 
          onClose={handlePopupClose} 
          userData={userData} // Kullanıcı verilerini geçiyoruz
        />
      )}
    </div>
  );
};

export default Profile;
