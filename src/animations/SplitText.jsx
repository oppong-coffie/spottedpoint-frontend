import { useEffect, useRef } from 'react';
import gsap from './gsapCore';

export default function SplitText({ text, tag = 'h1', className = '', style = {}, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, stagger: .03, duration: 1, ease: 'power4.out', delay }
    );
  }, [delay]);

  const Tag = tag;
  return (
    <Tag ref={ref} className={className} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 .05em', ...style }}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} style={{ overflow: 'hidden', display: 'inline-block' }}>
          {word.split('').map((c, ci) => (
            <span key={ci} className="char" style={{ display: 'inline-block' }}>{c}</span>
          ))}
          {wi < text.split(' ').length - 1 && (
            <span className="char" style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}