import { useEffect, useRef } from 'react';
import gsap from './gsapCore';
import { BRAND } from '../utils/constants';

export default function AdvancedCursor() {
  const cursorRef  = useRef(null);
  const followerRef = useRef(null);
  const label      = useRef(null);

  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX, y: e.clientY,
        duration: .1, ease: 'power3.out',
      });
      gsap.to(follower, {
        x: e.clientX, y: e.clientY,
        duration: .35, ease: 'power3.out',
      });
    };

    const onEnter = (e) => {
      const el = e.target;
      gsap.to(follower, { scale: 2.2, opacity: .5, duration: .3 });
      gsap.to(cursor,   { scale: .4,  duration: .2 });
      if (el.dataset.cursorLabel) {
        label.current.textContent = el.dataset.cursorLabel;
        gsap.to(label.current, { opacity: 1, scale: 1 });
      }
    };

    const onLeave = () => {
      gsap.to(follower, { scale: 1, opacity: .6, duration: .3 });
      gsap.to(cursor,   { scale: 1, duration: .2 });
      gsap.to(label.current, { opacity: 0, scale: .8 });
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-hover], .reveal-card, .service-card, .feature-card')
      .forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={cursorRef} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: BRAND.orange, pointerEvents: 'none', zIndex: 99999,
        transform: 'translate(-50%,-50%)',
        boxShadow: `0 0 10px ${BRAND.orange}80`,
      }} />
      {/* Ring */}
      <div ref={followerRef} style={{
        position: 'fixed', width: 40, height: 40, borderRadius: '50%',
        border: `1.5px solid ${BRAND.orange}`,
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-50%,-50%)', opacity: .6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span ref={label} style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.5rem',
          color: BRAND.orange, letterSpacing: '.06em', textTransform: 'uppercase',
          opacity: 0, transform: 'scale(.8)',
          transition: 'opacity .2s, transform .2s',
          whiteSpace: 'nowrap',
        }} />
      </div>
    </>
  );
}