import { useLayoutEffect } from 'react';
import gsap from './gsapCore';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionScenes() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Hero pin + scale out on scroll
      if (document.querySelector('.hero-pin')) {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-pin', start: 'top top',
            end: '+=80%', scrub: true, pin: true,
          },
        })
          .to('.hero-title', { scale: 1.08, y: -60, opacity: .25 })
          .to('.hero-sub',   { y: -30, opacity: 0 }, '<');
      }

      // About section slide in
      if (document.querySelector('.about-left')) {
        gsap.from('.about-left', {
          x: -100, opacity: 0,
          scrollTrigger: { trigger: '.about', start: 'top 78%', end: 'top 40%', scrub: 1 },
        });
        gsap.from('.about-right', {
          x: 100, opacity: 0,
          scrollTrigger: { trigger: '.about', start: 'top 78%', end: 'top 40%', scrub: 1 },
        });
      }

      // Services stagger
      if (document.querySelector('.services')) {
        gsap.from('.service-item', {
          y: 80, opacity: 0, stagger: .18,
          scrollTrigger: { trigger: '.services', start: 'top 80%', end: 'top 30%', scrub: 1 },
        });
      }

      // Works parallax
      gsap.utils.toArray('.work-img').forEach((img) => {
        gsap.to(img, {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });

    });
    return () => ctx.revert();
  }, []);

  return null;
}