import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  style = {},
  onClick,
  href,
  strength = 0.28,
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * strength;
    const y    = (e.clientY - rect.top  - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const commonProps = {
    ref,
    onMouseMove:  handleMove,
    onMouseLeave: handleLeave,
    className:    `btn ${className}`,
    style: {
      ...style,
      transition: 'transform .45s cubic-bezier(.23,1,.32,1), box-shadow .3s, background .3s',
      cursor: 'none',
    },
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <motion.button {...commonProps} onClick={onClick} whileTap={{ scale: .96 }}>
      {children}
    </motion.button>
  );
}