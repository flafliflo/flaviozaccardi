import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { PALETTE, SPRITES } from "../data/pixelSprites";

// Ein Frame als ein <path> pro Farbe: viel schneller als hunderte <rect>s.
function framePaths(rows) {
  const byColor = {};
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      byColor[ch] = (byColor[ch] || "") + `M${x} ${y}h1v1h-1z`;
    });
  });
  return Object.entries(byColor);
}

/**
 * Animiertes Pixel-Logo. Beim ersten Sichtkontakt "baut" es sich Pixel für Pixel
 * diagonal auf, danach läuft die Frame-Animation (nur solange es sichtbar ist).
 */
export default function PixelArt({ name, fast = false, className = "" }) {
  const sprite = SPRITES[name];
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-5% 0px" });
  const [built, setBuilt] = useState(false);
  const [frame, setFrame] = useState(0);
  const paths = useMemo(() => sprite.frames.map(framePaths), [sprite]);

  // Aufbau-Phase: nach der letzten Pixel-Verzögerung auf die Animation umschalten
  useEffect(() => {
    if (!inView || built) return;
    const id = setTimeout(() => setBuilt(true), (sprite.w + sprite.h) * 22 + 400);
    return () => clearTimeout(id);
  }, [inView, built, sprite]);

  useEffect(() => {
    if (!built || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fps = sprite.fps * (fast ? 1.8 : 1);
    const id = setInterval(() => setFrame((f) => (f + 1) % sprite.frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [built, inView, fast, sprite]);

  return (
    <svg
      ref={ref}
      className={`pixelArt ${className}`}
      viewBox={`0 0 ${sprite.w} ${sprite.h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {built
        ? paths[frame].map(([c, d]) => <path key={c} d={d} fill={PALETTE[c]} />)
        : inView &&
          sprite.frames[0].flatMap((row, y) =>
            [...row].map((ch, x) =>
              ch === "." ? null : (
                <rect
                  key={`${x}-${y}`}
                  className="pixelArt__px"
                  x={x}
                  y={y}
                  width="1"
                  height="1"
                  fill={PALETTE[ch]}
                  style={{ animationDelay: `${(x + y) * 22}ms` }}
                />
              )
            )
          )}
    </svg>
  );
}
