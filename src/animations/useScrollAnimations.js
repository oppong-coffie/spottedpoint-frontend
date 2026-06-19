import { useLayoutEffect } from 'react';
import gsap from './gsapCore';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section children stagger
      gsap.utils.toArray('.section').forEach((section) => {
        gsap.from(section.children, {
          y: 70, opacity: 0, stagger: .15, duration: 1, delay: 0.2,
          scrollTrigger: {
            trigger: section, start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Reveal cards
      gsap.utils.toArray('.reveal-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 90, opacity: 0, scale: .96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2,
            scrollTrigger: { trigger: card, start: 'top 87%' }
          }
        );
      });

      // Fade-in elements
      gsap.utils.toArray('.fade-in').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: .9, delay: 0.2,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}