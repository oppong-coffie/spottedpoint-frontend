import { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../../utils/constants';

/**
 * Reusable component to render a faded background slideshow inside section headers.
 * @param {string[]} images Array of image source URLs.
 * @param {number} interval Switch interval in milliseconds.
 * @param {number} opacity Max opacity of active background image.
 */
export default function HeroCarousel({ images = HERO_IMAGES, interval = 5000, opacity = 0.55 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(t);
  }, [images, interval]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {images.map((src, i) => (
        <div
          key={src + i}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === index ? opacity : 0,
            transition: 'opacity 1.5s ease-in-out, transform 6s ease-in-out',
            transform: i === index ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ))}
      {/* Smooth bottom gradient blend */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,13,31,0.02) 0%, rgba(6,13,31,0.15) 100%)',
        }}
      />
    </div>
  );
}
