import { BRAND } from '../../utils/constants';

export default function Logo({ size = 48, textScale = 1, dark = false }) {
  const textColor = dark ? '#fff' : BRAND.blue;
  const s = size / 50;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 * s }}>
      <svg width={size} height={size} viewBox="0 0 50 50">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 2 * Math.PI;
          return <circle key={i} cx={25 + 22 * Math.cos(a)} cy={25 + 22 * Math.sin(a)} r={1.4} fill={BRAND.blue} opacity={.55} />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * 2 * Math.PI + .2;
          return <circle key={i} cx={25 + 15 * Math.cos(a)} cy={25 + 15 * Math.sin(a)} r={1.8} fill={BRAND.blue} opacity={.85} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 2 * Math.PI + .4;
          return <circle key={i} cx={25 + 8 * Math.cos(a)} cy={25 + 8 * Math.sin(a)} r={2} fill={BRAND.blue} />;
        })}
        <circle cx={25} cy={25} r={4.5} fill={BRAND.orange} />
      </svg>
      {textScale > 0 && (
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 14 * textScale * s, letterSpacing: '0.06em', color: textColor }}>
            SPOTTED <span style={{ color: BRAND.orange }}>POINT</span>
          </div>
          <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 7.5 * textScale * s, letterSpacing: '0.22em', color: textColor, opacity: .75 }}>
            MEDIA LIMITED
          </div>
        </div>
      )}
    </div>
  );
}