export default function WaveDivider({ fromColor = '#060d1f', toColor = '#0a1628', flip = false }) {
  return (
    <div style={{ position: 'relative', lineHeight: 0, background: fromColor, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 80 }}>
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={toColor} />
      </svg>
    </div>
  );
}