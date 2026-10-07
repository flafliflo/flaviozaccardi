import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINE = "Mich in den nächsten Jahren als Informatiker durchsetzen.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [20, 0]);
  return (
    <motion.span className="goal__word" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

// Ein Kreis in Akzentfarbe wächst beim Scrollen auf, danach erscheint das Ziel Wort für Wort.
export default function Goal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0, 0.4], ["circle(4% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const words = LINE.split(" ");

  return (
    <section className="goal" id="goal" ref={ref}>
      <div className="goal__sticky">
        <motion.div className="goal__fill" style={{ clipPath: clip }}>
          <div className="container goal__inner">
            <motion.span className="mono goal__label" style={{ opacity: labelOpacity }}>
              ✦ Mein Ziel
            </motion.span>
            <p className="goal__text">
              {words.map((w, i) => {
                const start = 0.4 + (i / words.length) * 0.45;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, start + 0.45 / words.length]}>
                    {w}
                  </Word>
                );
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
