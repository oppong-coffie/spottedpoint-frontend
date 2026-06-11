import { BRAND } from '../../utils/constants';

export default function AuroraBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Deep blue blob — top left */}
      <div style={{
        position: 'absolute', top: -250, left: -150,
        width: 700, height: 700, borderRadius: '50%',
        background: `${BRAND.blue}38`,
        filter: 'blur(140px)',
        animation: 'pulse 5s ease-in-out infinite',
      }} />
      {/* Orange blob — bottom right */}
      <div style={{
        position: 'absolute', bottom: -250, right: -150,
        width: 700, height: 700, borderRadius: '50%',
        background: `${BRAND.orange}16`,
        filter: 'blur(140px)',
        animation: 'pulse 7s ease-in-out infinite',
        animationDelay: '1.5s',
      }} />
      {/* Mid blue — center */}
      <div style={{
        position: 'absolute', top: '35%', left: '45%',
        width: 500, height: 500, borderRadius: '50%',
        background: `${BRAND.navyLight}30`,
        filter: 'blur(120px)',
        animation: 'floatSlow 8s ease-in-out infinite',
      }} />
    </div>
  );
}