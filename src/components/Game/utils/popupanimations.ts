import { gsap } from 'gsap';

export const animatePopup = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 1.1, rotationX: 0 },  // Başlangıç durumu: biraz büyük ve şeffaf
    { opacity: 1, scale: 1, rotationX: 0, duration: 0.4, ease: 'ease.out' }  // Bitiş durumu: tamamen opak ve orijinal boyut
  );
};
