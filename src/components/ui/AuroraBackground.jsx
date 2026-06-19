import { BRAND } from '../../utils/constants';

export default function AuroraBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at 50% 50%, #060d23 0%, #030714 100%)',
    }}>
      {/* Glow Blob 1 (Orange/Brand Glow) */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND.orange}18 0%, transparent 70%)`,
        filter: 'blur(100px)',
        animation: 'pulseBlob 20s ease-in-out infinite',
      }} />

      {/* Glow Blob 2 (Blue Glow) */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND.blue}20 0%, transparent 70%)`,
        filter: 'blur(120px)',
        animation: 'pulseBlobReverse 24s ease-in-out infinite',
      }} />

      {/* Glow Blob 3 (Deep Violet Glow) */}
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '25%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(40,59,144,0.12) 0%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'pulseBlob 28s ease-in-out infinite',
        animationDelay: '-5s',
      }} />

      {/* Glow Blob 4 (Cyan/Blue Light) */}
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '10%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND.blueLight}0f 0%, transparent 70%)`,
        filter: 'blur(90px)',
        animation: 'pulseBlobReverse 18s ease-in-out infinite',
        animationDelay: '-9s',
      }} />
    </div>
  );
}