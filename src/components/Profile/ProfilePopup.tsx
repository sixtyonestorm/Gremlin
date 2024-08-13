import React, { useEffect, useState, useRef } from 'react';
import { animatePopup } from '../Game/utils/popupanimations';

interface ProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
  userId: number; // Kullanıcı ID'si props olarak alınır
}

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isVisible, onClose, userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      popupRef.current.style.opacity = "1"; // Başlangıçta opacity değerini 1 olarak ayarlıyoruz.
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://greserver-b4a1eced30d9.herokuapp.com/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-gray-900 bg-opacity-40">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-6 rounded-lg shadow-2xl w-full max-w-sm relative opacity-1"
      >
        <h2 className="text-2xl font-extrabold text-yellow-400 mb-4 text-center">
          Profile Information
        </h2>
        
        <div className="space-y-4 mb-4 text-base text-gray-200">
          {userData ? (
            <>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-300">Username:</span>
                <span className="text-yellow-300 font-semibold">{userData.username || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-300">First Name:</span>
                <span className="text-green-400 font-semibold">{userData.first_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-300">Last Name:</span>
                <span className="text-yellow-300 font-semibold">{userData.last_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-300">Language Code:</span>
                <span className="text-red-400 font-semibold">{userData.language_code || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-300">Premium Status:</span>
                <span className="text-purple-300 font-semibold">{userData.is_premium ? 'Yes' : 'No'}</span>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-300">Loading...</div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
