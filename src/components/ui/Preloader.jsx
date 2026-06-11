import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { BRAND } from '../../utils/constants';

export default function Preloader({ onComplete }) {
  const [progress,   setProgress]   = useState(0);
  const [isVisible,  setIsVisible]  = useState(true);
  const [phase,      setPhase]      = useState('loading'); // loading | revealing

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setPhase('revealing');
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete?.(), 800);
        }, 600);
      }
      setProgress(current);
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: .8, ease: [.22, 1, .36, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#030a18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Aurora blobs */}
          <div style={{ position: 'absolute', top: -200, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'rgba(40,59,144,.25)', filter: 'blur(140px)', animation: 'pulse 3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: -200, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'rgba(248,149,33,.1)', filter: 'blur(140px)', animation: 'pulse 4s ease-in-out infinite' }} />

          {/* Scanning line */}
          <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(248,149,33,.5),transparent)', animation: 'scan 2s linear infinite', zIndex: 1 }} />

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

            {/* Animated logo */}
            <motion.div
              initial={{ scale: .6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
              <div style={{ animation: 'floatSlow 3s ease-in-out infinite' }}>
                <Logo size={80} textScale={1.4} dark />
              </div>
            </motion.div>

            {/* Progress number */}
            <motion.div
              animate={{ opacity: phase === 'revealing' ? 0 : 1 }}
              transition={{ duration: .4 }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '3.5rem', color: BRAND.orange, lineHeight: 1, display: 'block', textShadow: `0 0 40px rgba(248,149,33,.5)` }}>
                {progress}%
              </span>
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: 280, height: 2, background: 'rgba(255,255,255,.08)', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: .15 }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.orange})`, borderRadius: 1, position: 'relative' }}>
                {/* Glow tip */}
                <div style={{ position: 'absolute', right: 0, top: -3, width: 8, height: 8, borderRadius: '50%', background: BRAND.orange, boxShadow: `0 0 12px ${BRAND.orange}` }} />
              </motion.div>
            </div>

            {/* Loading text */}
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: '.72rem', letterSpacing: '.28em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', animation: 'blink 1.4s ease-in-out infinite' }}>
              {phase === 'revealing' ? 'Entering Experience' : 'Loading Assets'}
            </p>
          </div>

          {/* Curtain reveal on exit */}
          {phase === 'revealing' && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: .6, ease: [.77, 0, .18, 1] }}
              style={{ position: 'absolute', inset: 0, background: BRAND.orange, transformOrigin: 'left', zIndex: 3 }} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}