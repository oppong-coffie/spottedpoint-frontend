import { useLayoutEffect } from 'react';
import gsap from './gsapCore';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RevealSystem() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Service cards
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: .94 },
          { y: 0, opacity: 1, scale: 1, duration: .9, delay: i * .1,
            scrollTrigger: { trigger: card, start: 'top 86%' } }
        );
      });

      // Feature cards
      gsap.utils.toArray('.feature-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1,
            scrollTrigger: { trigger: card, start: 'top 85%' } }
        );
      });

      // Image mask reveals
      gsap.utils.toArray('.mask-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 82%' } }
        );
      });

      // Text lines
      gsap.utils.toArray('.text-reveal-line').forEach((line) => {
        gsap.from(line, {
          y: '110%', opacity: 0, duration: .8,
          scrollTrigger: { trigger: line, start: 'top 90%' },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}