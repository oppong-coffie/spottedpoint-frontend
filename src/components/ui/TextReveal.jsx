import { motion } from 'framer-motion';

export default function TextReveal({ children, delay = 0, style = {}, className = '' }) {
  return (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: .85, ease: [.22, 1, .36, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}