import React, { useState, useEffect } from 'react';

const MAX_LEVEL = 10; // Sabit maksimum seviye

const Level: React.FC = () => {
  const [currentLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  // Seviye ilerlemesini hesapla
  useEffect(() => {
    const newProgress = (currentLevel / MAX_LEVEL) * 1000;
    setProgress(newProgress);
  }, [currentLevel]);

  return (
    <div className="fixed bottom-[90px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative w-64 h-5 bg-gray-700 rounded-full shadow-lg overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-green-900 to-green-500 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
          Level {currentLevel}
        </div>
      </div>
    </div>
  );
};

export default Level;
