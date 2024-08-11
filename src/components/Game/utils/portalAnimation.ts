import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const usePortalAnimation = () => {
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const middleCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const centerLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerCircleRef.current && middleCircleRef.current && innerCircleRef.current && centerLightRef.current) {
      // Dış halka animasyonu
      gsap.fromTo(
        outerCircleRef.current,
        { rotation: 0, scale: 1 },
        {
          rotation: 360,
          scale: 1.1,
          duration: 20,
          repeat: -1,
          ease: 'linear',
          repeatDelay: 1
        }
      );

      // Orta halka animasyonu
      gsap.fromTo(
        middleCircleRef.current,
        { rotation: 0, scale: 1 },
        {
          rotation: -360,
          scale: 1.05,
          duration: 10,
          repeat: -1,
          ease: 'linear',
          repeatDelay: 1
        }
      );

      // İç halka animasyonu
      gsap.fromTo(
        innerCircleRef.current,
        { rotation: 0, scale: 1 },
        {
          rotation: 360,
          scale: 1.2,
          duration: 5,
          repeat: -1,
          ease: 'linear',
          repeatDelay: 1
        }
      );

      // Merkez ışık animasyonu
      gsap.fromTo(
        centerLightRef.current,
        { opacity: 0.6 },
        {
          opacity: 0.2,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut'
        }
      );
    }
  }, []);

  return { outerCircleRef, middleCircleRef, innerCircleRef, centerLightRef };
};

export default usePortalAnimation;
