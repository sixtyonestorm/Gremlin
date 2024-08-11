import React from 'react';

interface HealthBarProps {
  hp: number;      // Mevcut sağlık miktarı
  maxHp: number;  // Maksimum sağlık miktarı
}

const HealthBar: React.FC<HealthBarProps> = ({ hp, maxHp }) => {
  const widthPercentage = (hp / maxHp) * 100;

  return (
    <div className="w-full max-w-[200px] mx-auto bg-gray-800 rounded-full h-6 relative overflow-hidden">
      <div
        className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
        style={{ width: `${widthPercentage}%` }} // Sağlık çubuğunun genişliğini ayarlama
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-semibold text-xs drop-shadow-lg">
            {hp}/{maxHp}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-full border border-green-500 bg-gray-900 bg-opacity-40 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-700 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default HealthBar;
