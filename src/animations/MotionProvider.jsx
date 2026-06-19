import { createContext, useContext, useLayoutEffect } from 'react';
import gsap from './gsapCore';

const MotionContext = createContext();

export function MotionProvider({ children }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .from('.nav-fixed', { y: -80, opacity: 0, duration: .9 });
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