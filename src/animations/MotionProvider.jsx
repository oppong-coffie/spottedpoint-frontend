import { createContext, useContext, useLayoutEffect } from 'react';
import gsap from './gsapCore';

const MotionContext = createContext();

export function MotionProvider({ children }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .from('header', { y: -80, opacity: 0, duration: .9 })
        .from('.hero-title',  { y: 100, opacity: 0, stagger: .1 }, '-=0.5')
        .from('.hero-sub',    { y: 40,  opacity: 0 },               '-=0.6')
        .from('.hero-button', { y: 30,  opacity: 0, stagger: .1 },  '-=0.5');
    });
    return () => ctx.revert();
  }, []);

  return (
    <MotionContext.Provider value={{}}>
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);