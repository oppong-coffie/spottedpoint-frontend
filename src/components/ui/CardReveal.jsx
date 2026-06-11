import { motion } from 'framer-motion';

export default function CardReveal({ children, delay = 0, style = {}, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: .8, ease: [.22, 1, .36, 1], delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={className}
      style={style}>
      {children}
    </motion.div>
  );
}