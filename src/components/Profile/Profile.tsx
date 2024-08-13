import React, { useEffect, useState } from 'react';
import ProfilePopup from './ProfilePopup'; // ProfilePopup bileşenini import ettik
import profileWebp from '../../icons/profile.webp'; // WebP dosyasının yolunu import et

// Kullanıcı verileri için bir arayüz oluşturuyoruz
interface UserData {
  username: string;
  level: number;
  experience: number;
  power: number;
  totalEarn: number;
}

const Profile: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // Kullanıcı verileri için tip belirledik

  const handleProfileClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://greserver-b4a1eced30d9.herokuapp.com/api/user/1`); // Kullanıcı ID'si sabit, dinamik olması gerekirse bu kısmı güncelleyin
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserData = await response.json(); // Gelen veriyi UserData türüne çeviriyoruz
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // userId değiştiğinde veriyi tekrar çekmeye gerek yoksa boş array

  return (
    <div className="relative">
      <div
        className="fixed top-[65px] left-4 flex flex-col items-center cursor-pointer z-50"
        onClick={handleProfileClick}
      >
        {/* Profil simgesi */}
        <div className="relative rounded-full p-2 transition-transform transform hover:scale-110 hover:cursor-pointer">
          <img src={profileWebp} alt="Profile" className="w-12 h-12" />
        </div>
        <span className="text-white text-xs font-bold mt-[-2px] text-shadow-md">Character</span>
      </div>

      {/* ProfilePopup açıldığında görünür */}
      {isPopupVisible && userData && (
        <ProfilePopup
          isVisible={isPopupVisible}
          onClose={handlePopupClose}
          userData={userData} // Kullanıcı verilerini ProfilePopup'a geçir
        />
      )}
    </div>
  );
};

export default Profile;
