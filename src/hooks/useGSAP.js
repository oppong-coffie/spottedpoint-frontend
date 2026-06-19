import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
}

// Animate elements with ScrollTrigger on mount
export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up
      gsap.utils.toArray('.gs-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 55 },
          {
            opacity: 1, y: 0, duration: .85, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });

      // Fade left
      gsap.utils.toArray('.gs-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -65 },
          {
            opacity: 1, x: 0, duration: .9, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
          }
        );
      });

      // Fade right
      gsap.utils.toArray('.gs-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 65 },
          {
            opacity: 1, x: 0, duration: .9, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
          }
        );
      });

      // Staggered children
      gsap.utils.toArray('.gs-stagger').forEach((parent) => {
        gsap.fromTo(parent.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: parent, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

export { gsap, ScrollTrigger };