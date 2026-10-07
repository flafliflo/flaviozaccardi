import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import HeroCanvas from "./HeroCanvas";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "../hooks/useSmoothScroll";

const EASE = [0.16, 1, 0.3, 1];
const ROLES = ["Applikationsentwickler", "ERP Developer", "React Enthusiast", "UI Tüftler"];

function SplitLine({ text, delay, ready }) {
  return (
    <span className="split" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span className="split__mask" key={i} aria-hidden="true">
          <motion.span
            className="split__char"
            initial={{ y: "115%", rotate: 8 }}
            animate={ready ? { y: "0%", rotate: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.035 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ScrollLink({ to, label, primary }) {
  return (
    <Magnetic>
      <a
        className={`btn ${primary ? "btn--primary" : ""}`}
        href={to}
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget(to);
        }}
      >
        <span className="roll"><span className="roll__inner" data-text={label}>{label}</span></span>
      </a>
    </Magnetic>
  );
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top" ref={ref}>
      <HeroCanvas />
      <div className="hero__glow" aria-hidden="true" />

      <motion.div className="hero__inner container" style={{ y, opacity, scale }}>
        <motion.div className="hero__eyebrow" {...fade(0.2)}>
          <span className="pulse" />
          <span className="mono">Lernender bei Borm Informatik · Schweiz</span>
        </motion.div>

        <h1 className="hero__title">
          <SplitLine text="Flavio" delay={0.1} ready={ready} />
          <span className="hero__titleRow">
            <SplitLine text="Zaccardi" delay={0.3} ready={ready} />
            <motion.span
              className="hero__star"
              initial={{ scale: 0, rotate: -180 }}
              animate={ready ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          </span>
        </h1>

        <div className="hero__meta">
          <motion.p className="hero__role" {...fade(0.9)}>
            <span className="mono hero__roleLabel">/ Rolle</span>
            <ScrambleText words={ROLES} start={ready} />
          </motion.p>

          <motion.p className="hero__lead" {...fade(1.05)}>
            17 Jahre alt, im 2. Lehrjahr als Applikationsentwickler. Ich entwickle ERP-Software,
            baue moderne Web-Interfaces und liebe Details, die man spürt, bevor man sie sieht.
          </motion.p>

          <motion.div className="hero__cta" {...fade(1.2)}>
            <ScrollLink to="#contact" label="Kontakt aufnehmen" primary />
            <ScrollLink to="#work" label="Was ich mache" />
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        className="hero__scroll"
        onClick={() => scrollToTarget("#about")}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        aria-label="Nach unten scrollen"
      >
        <span className="mono">Scroll</span>
        <span className="hero__scrollLine" />
      </motion.button>
    </section>
  );
}
