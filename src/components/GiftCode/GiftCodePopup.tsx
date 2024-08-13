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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-gray-900 bg-opacity-40">
      <div
        ref={popupRef}
        className="bg-gradient-to-br from-green-800 via-green-700 to-black p-4 rounded-lg shadow-2xl w-full max-w-xs"
      >
        <h2 className="text-lg font-bold text-yellow-400 mb-3 text-center">
          Enter Gift Code
        </h2>

        {/* Kartlar */}
        <div className="mb-4 space-y-4">
          <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 p-3 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Card 1</h3>
            <p className="text-gray-200">Description for the first card goes here.</p>
          </div>
          <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 p-3 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Card 2</h3>
            <p className="text-gray-200">Description for the second card goes here.</p>
          </div>
          <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 p-3 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Card 3</h3>
            <p className="text-gray-200">Description for the third card goes here.</p>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter code here"
            className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 ease-in-out text-sm"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 transition duration-300 ease-in-out text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftCodePopup;
