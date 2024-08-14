import React, { useState, useRef, useEffect } from 'react';
import { animatePopup } from '../Game/utils/popupanimations'; // Güncellenmiş yol

interface GiftCodePopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const GiftCodePopup: React.FC<GiftCodePopupProps> = ({ isVisible, onClose }) => {
  const [code, setCode] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      animatePopup(popupRef.current);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    // Hediye kodunu işlemek için gerekli işlemler burada yapılabilir
    console.log(`Gift Code Submitted: ${code}`);
    onClose(); // Kod gönderildikten sonra popup'ı kapat
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-gray-900 bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-4 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-md font-bold text-yellow-300 mb-3 text-center">
          Enter Gift Code
        </h2>

        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => openLink('https://www.youtube.com/watch?v=frip8Ano1nA')}>
            <img
              src="https://img.youtube.com/vi/frip8Ano1nA/hqdefault.jpg"
              alt="YouTube video preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="text-gray-300">
              <h3 className="text-sm font-semibold mb-1">Video Title 1</h3>
              <p className="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => openLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}>
            <img
              src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
              alt="YouTube video preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="text-gray-300">
              <h3 className="text-sm font-semibold mb-1">Video Title 2</h3>
              <p className="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>

          {/* More video previews can be added here */}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter code"
            className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 text-sm"
          />
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-200 ease-in-out text-xs"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-md shadow-md hover:from-red-500 hover:to-red-700 transition duration-200 ease-in-out text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftCodePopup;
