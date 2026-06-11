import { motion } from 'framer-motion';

export default function SplitTextReveal({ text, style = {}, className = '', delay = 0, tag = 'h2' }) {
  const Tag    = tag;
  const words  = text.split(' ');

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: .08, delayChildren: delay } },
  };
  const word = {
    hidden:  { y: '110%', opacity: 0, skewY: 5 },
    visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } },
  };

  return (
    <Tag className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 .3em' }}>
        {words.map((w, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span variants={word} style={{ display: 'inline-block' }}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}