import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";

import Reveal, { SectionLabel } from "./Reveal";

const TEXT =
  "Ich bin Flavio Mattia Zaccardi und mache meine Lehre als Applikationsentwickler bei Borm Informatik. " +
  "Im Alltag entwickle ich an unserem ERP-System mit BormScript, unserer eigenen Sprache, die JavaScript sehr ähnlich ist. " +
  "In meiner Freizeit baue ich Web-Interfaces mit React und tüftle so lange an Animationen, bis sie sich richtig anfühlen.";

const HIGHLIGHT = new Set(["Applikationsentwickler", "ERP-System", "BormScript,", "React"]);

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const clean = children.replace(/[.,]$/, "");
  const accent = HIGHLIGHT.has(children) || HIGHLIGHT.has(clean);
  return (
    <motion.span className={`about__word ${accent ? "is-accent" : ""}`} style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 17, label: "Jahre alt" },
  { value: 2, suffix: ".", label: "Lehrjahr" },
  { value: 100, suffix: "%", label: "Motivation" },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionLabel index="01">Über mich</SectionLabel>

        <p className="about__text" ref={ref}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={i * 0.1}>
              <div className="stat__value">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="stat__label mono">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
