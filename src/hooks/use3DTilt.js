import { useEffect, useRef } from 'react';

/**
 * Hook to apply a premium 3D tilt effect on an element on mouse move.
 * @param {object} options Config options for the tilt.
 * @returns {React.RefObject} The ref to attach to the element.
 */
export default function use3DTilt(options = {}) {
  const ref = useRef(null);
  const { max = 10, perspective = 800, scale = 1.03, speed = 300 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow ${speed}ms cubic-bezier(0.16, 1, 0.3, 1), border-color ${speed}ms ease`;
    el.style.transformStyle = 'preserve-3d';

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const dx = x - xc;
      const dy = y - yc;
      
      const tiltX = -(dy / yc) * max;
      const tiltY = (dx / xc) * max;

      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      
      // Dynamic shift of shadows and subtle glow
      const shadowX = -tiltY * 1.5;
      const shadowY = tiltX * 1.5;
      el.style.boxShadow = `${shadowX}px ${shadowY}px 28px rgba(0,0,0,0.18), 0 10px 30px rgba(248,149,33,0.06)`;
    };

    const onMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.boxShadow = '';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [max, perspective, scale, speed]);

  return ref;
}
