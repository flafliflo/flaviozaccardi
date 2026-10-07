import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const ITEMS = ["React", "BormScript", "Python", "C#", "SQL", "Rust", "JavaScript", "SCSS", "UI / UX", "Git"];

// Endlos-Laufband, das auf Scroll-Geschwindigkeit reagiert (schneller, Richtungswechsel, Skew).
function Row({ baseVelocity, outline }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const content = [...ITEMS, ...ITEMS];

  return (
    <div className={`marquee__row ${outline ? "is-outline" : ""}`}>
      <motion.div className="marquee__track" style={{ x, skewX: skew }}>
        {content.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__sep">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Technologien">
      <Row baseVelocity={-2} />
      <Row baseVelocity={2} outline />
    </section>
  );
}
