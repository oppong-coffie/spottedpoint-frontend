import { useEffect } from 'react';
import gsap from './gsapCore';

export default function VelocityEffect({ selector = '.velocity-target' }) {
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const current  = window.scrollY;
      const velocity = current - lastScroll;
      const targets  = document.querySelectorAll(selector);

      if (targets.length) {
        gsap.to(targets, {
          y: velocity * -0.18,
          duration: .6, ease: 'power3.out',
        });
      }
      lastScroll = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector]);

  return null;
}