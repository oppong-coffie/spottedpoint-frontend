import { useEffect, useRef } from 'react';
import { BRAND } from '../../utils/constants';

export default function Cursor() {
  const dot    = useRef(null);
  const ring   = useRef(null);
  const pos    = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    // Smooth ring follow
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      if (ring.current) {
        ring.current.style.left = pos.current.x + 'px';
        ring.current.style.top  = pos.current.y + 'px';
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top  = e.clientY + 'px';
      }
    };

    const onEnter = () => {
      if (dot.current)  dot.current.style.transform  = 'translate(-50%,-50%) scale(2.5)';
      if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1.8)';
      if (dot.current)  dot.current.style.background = '#fff';
      if (ring.current) ring.current.style.borderColor = BRAND.orange;
    };
    const onLeave = () => {
      if (dot.current)  dot.current.style.transform  = 'translate(-50%,-50%) scale(1)';
      if (ring.current) ring.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (dot.current)  dot.current.style.background = BRAND.orange;
      if (ring.current) ring.current.style.borderColor = BRAND.orange;
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dot} style={{
        position: 'fixed', width: 8, height: 8, borderRadius: '50%',
        background: BRAND.orange, pointerEvents: 'none', zIndex: 99999,
        transform: 'translate(-50%,-50%)',
        transition: 'transform .2s ease, background .2s ease',
        boxShadow: `0 0 10px ${BRAND.orange}80`,
      }} />
      {/* Ring — lerp-smoothed */}
      <div ref={ring} style={{
        position: 'fixed', width: 38, height: 38, borderRadius: '50%',
        border: `1.5px solid ${BRAND.orange}`,
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-50%,-50%)',
        transition: 'transform .3s ease, border-color .2s ease',
        opacity: .65,
      }} />
    </>
  );
}