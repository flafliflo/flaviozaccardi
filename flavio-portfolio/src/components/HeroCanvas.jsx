import { useEffect, useRef } from "react";

// Interaktives Punkt-Raster: Punkte weichen dem Cursor aus und federn zurück.
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let points = [];
    let w = 0;
    let h = 0;
    let raf;
    let t = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = w < 700 ? 26 : 32;
      points = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          points.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const radius = 160;

      for (const p of points) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const force = (1 - dist / radius) * 6;
          p.vx += (dx / (dist || 1)) * force;
          p.vy += (dy / (dist || 1)) * force;
        }

        // Sanfte Welle, damit das Raster auch ohne Maus lebt
        const wave = Math.sin(p.ox * 0.008 + t) * Math.cos(p.oy * 0.01 + t * 0.8) * 4;

        p.vx += (p.ox - p.x) * 0.06;
        p.vy += (p.oy + wave - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const offset = Math.min(Math.hypot(p.x - p.ox, p.y - p.oy) / 18, 1);
        const glow = dist < radius ? 1 - dist / radius : 0;
        const size = 1 + offset * 1.6 + glow * 1.2;

        ctx.fillStyle =
          glow > 0.05
            ? `rgba(212, 255, 58, ${0.25 + glow * 0.75})`
            : `rgba(255, 255, 255, ${0.12 + offset * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
