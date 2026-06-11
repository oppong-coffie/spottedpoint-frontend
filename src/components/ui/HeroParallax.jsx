import { useEffect, useRef } from 'react';

export default function HeroParallax({ children, strength = 0.018 }) {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      const x = (e.clientX - window.innerWidth  / 2) * strength;
      const y = (e.clientY - window.innerHeight / 2) * strength;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [strength]);

  return (
    <div ref={ref} style={{ transition: 'transform .35s cubic-bezier(.23,1,.32,1)' }}>
      {children}
    </div>
  );
}