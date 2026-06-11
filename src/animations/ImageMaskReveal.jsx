import { useEffect, useRef } from 'react';
import gsap from './gsapCore';

export default function ImageMaskReveal({ src, alt = '', style = {}, className = '', delay = 0 }) {
  const imgRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Inner curtain element
    gsap.set(imgRef.current, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.to(imgRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.5, ease: 'power4.out', delay,
    });
    // Zoom-in image
    gsap.fromTo(imgRef.current,
      { scale: 1.25 },
      { scale: 1, duration: 1.8, ease: 'power3.out', delay }
    );
  }, [delay]);

  return (
    <div ref={wrapRef} style={{ borderRadius: 20, overflow: 'hidden', ...style }} className={className}>
      <img
        ref={imgRef}
        src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: 'center' }}
      />
    </div>
  );
}