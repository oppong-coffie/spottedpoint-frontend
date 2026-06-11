import { useEffect, useState } from 'react';
import { BRAND } from '../../utils/constants';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 3,
      zIndex: 9999, width: `${progress}%`,
      background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.orange})`,
      transition: 'width .1s linear',
      boxShadow: `0 0 12px ${BRAND.orange}80`,
    }} />
  );
}