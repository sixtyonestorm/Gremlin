import React from 'react';
import { FaHome, FaTools, FaBox, FaUsers, FaPaste, FaChartLine } from 'react-icons/fa';

interface BottomNavProps {
  currentPath: string;
  onNavItemClick: (component: string) => void;
}

const navItems = [
  { component: "game", icon: <FaHome size={24} />, label: "Game" },
  { component: "mining", icon: <FaTools size={24} />, label: "Mining" },
  { component: "inventory", icon: <FaBox size={24} />, label: "Inventory" },
  { component: "guild", icon: <FaUsers size={24} />, label: "Guild" },
  { component: "dungeon", icon: <FaPaste size={24} />, label: "Dungeon" },
  { component: "stats", icon: <FaChartLine size={24} />, label: "Stats" },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavItemClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-green-600 via-green-700 to-green-800 text-white flex justify-around py-2 shadow-lg border-t-2 border-yellow-400 z-50 opacity-70">
      {navItems.map(({ component, icon, label }) => (
        <button
          key={component}
          onClick={() => onNavItemClick(component)}
          className={`flex flex-col items-center transition-transform transform ${
            currentPath === component ? 'text-yellow-300 scale-110' : 'hover:scale-110 hover:text-yellow-300'
          }`}
        >
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              currentPath === component ? 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400' : 'bg-green-700 hover:bg-green-600'
            }`}
          >
            {icon}
          </div>
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
