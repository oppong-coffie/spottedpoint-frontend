import { motion } from 'framer-motion';

export default function ImageReveal({ src, alt, style = {}, className = '' }) {
  return (
    <div style={{ overflow: 'hidden', borderRadius: 20, ...style }} className={className}>
      <motion.img
        src={src} alt={alt || ''}
        initial={{ scale: 1.35, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [.22, 1, .36, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}