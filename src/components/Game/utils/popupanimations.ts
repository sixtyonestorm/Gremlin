import { gsap } from 'gsap';

export const animatePopup = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.5, rotationX: 90 },
    { opacity: 2, scale: 1, rotationX: 0, duration: 0.6, ease: 'back.out(1.7)' }
  );
};
