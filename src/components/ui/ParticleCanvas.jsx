import { useEffect, useRef } from 'react';

export default function ParticleCanvas({ style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    let animId;
    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const mouse = { x: w / 2, y: h / 2 };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const COUNT   = Math.min(90, Math.floor((w * h) / 14000));
    const CONNECT = 140;

    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - .5) * .45,
      vy: (Math.random() - .5) * .45,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Mouse repulsor
      nodes.forEach(n => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { n.vx += dx / d * 0.6; n.vy += dy / d * 0.6; }
        n.vx *= 0.98; n.vy *= 0.98;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            const alpha = (1 - dist / CONNECT) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(248,149,33,${alpha})`;
            ctx.lineWidth   = .8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248,149,33,0.7)';
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248,149,33,0.1)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }} />
  );
}