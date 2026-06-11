import { useLayoutEffect } from 'react';
import gsap from './gsapCore';

export default function HeroAnimation() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.hero-bg',    { scale: 1.25, opacity: 0, duration: 1.6 })
        .from('.hero-badge', { y: -24, opacity: 0, duration: .7 },   '-=1.2')
        .from('.hero-title', { y: 100, opacity: 0, stagger: .12 },   '-=1.0')
        .from('.hero-sub',   { y: 40,  opacity: 0, duration: .8 },   '-=0.7')
        .from('.hero-button',{ y: 36,  opacity: 0, stagger: .12 },   '-=0.5')
        .from('.hero-image', { scale: 1.18, opacity: 0, duration: 1.6 }, '-=1.4')
        .from('.hero-stats', { y: 30,  opacity: 0, stagger: .1 },    '-=0.8');
    });
    return () => ctx.revert();
  }, []);

  return null;
}