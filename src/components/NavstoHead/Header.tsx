import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Header: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const messages = [
    "🚀 Announcement: Start fresh and win big rewards! 🚀",
    "🎉 New Features Released: Check them out now! 🎉",
    "🔔 Don't Miss Out: Exclusive deals available today! 🔔"
  ];

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -100,
        duration: 20, // Adjusted for smoother transition
        ease: 'none', // Smooth scrolling effect
        repeat: -1,
        stagger: {
          amount: 1,
          from: 'start'
        },
      });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-green-900 text-white py-2 z-50 shadow-md">
      {/* Duyuru Marquesi */}
      <div className="relative py-1 border-b-2 border-yellow-400">
        <div className="overflow-hidden whitespace-nowrap">
          <div ref={marqueeRef} className="inline-block text-sm font-medium">
            {messages.map((message, index) => (
              <span key={index} className={`mr-4 ${index % 2 === 0 ? 'text-yellow-300' : 'text-green-200'}`}>
                {message}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Diğer header içerikleri */}
    </header>
  );
};

export default Header;
