import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import ProfilePopup from './ProfilePopup';

interface ProfileProps {
  userId: number;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [username, setUsername] = useState<string>('Unknown');
  const [totalCoins, setTotalCoins] = useState<number>(0);

  useEffect(() => {
    // API'den kullanıcı verilerini al
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://greserver-b4a1eced30d9.herokuapp.com/userdata', { id: userId });
        const userData = response.data;

        setUsername(userData.username || 'Unknown'); // Kullanıcı adını state'e ata
        setTotalCoins(userData.coin || 0); // Coin miktarını state'e ata
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleProfileClick = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="fixed top-4 left-4 flex flex-col items-center space-y-1 cursor-pointer z-50"
        onClick={handleProfileClick}
      >
        <div className="flex items-center justify-center p-1 rounded-full bg-gray-800">
          <FaUser size={20} className="text-white" />
        </div>
        <span className="text-xs font-medium text-white">{username}</span> {/* Kullanıcı adı */}
      </div>

      {/* ProfilePopup açıldığında, username ve totalCoins bilgilerini geçiriyoruz */}
      {isPopupVisible && (
        <ProfilePopup username={username} totalCoins={totalCoins} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Profile;
