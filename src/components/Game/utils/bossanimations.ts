import { gsap } from 'gsap';

export const animateBossClick = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 0.1,
    ease: 'bounce.out',
    onComplete: () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.1,
        ease: 'bounce.in',
      });
    },
  });
};
