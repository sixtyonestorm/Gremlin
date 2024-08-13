import ProfilePopup from './ProfilePopup';
import profileWebp from '../../icons/profile.webp';
import { UserData } from '../types/UserData'; // UserData'yı import et

import { useEffect, useState } from 'react';

const Profile: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // some side effect code here
  }, []);

  const handleProfileClick = async () => {
    // Telegram WebApp'den kullanıcı bilgilerini al
    const UserId = window.Telegram.WebApp.initDataUnsafe.user?.id;

    if (UserId) {
      try {
        // Kullanıcı verilerini veritabanından çekmek için API çağrısı yapın
        const response = await fetch(`https://greserver-b4a1eced30d9.herokuapp.com/api/user/${UserId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data: UserData = await response.json();
        setUserData(data);
        setIsPopupVisible(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
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
        <ProfilePopup isVisible={isPopupVisible} onClose={handlePopupClose} userData={userData} />
      )}
    </div>
  );
};

export default Profile;
