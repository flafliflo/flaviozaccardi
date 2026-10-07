import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const WORDS = ["Code", "Design", "Motion", "Flavio"];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = WORDS[Math.min(Math.floor(count / 26), WORDS.length - 1)];

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="preloader__word">
            <AnimatePresence initial={false}>
              <motion.span
                key={word}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="preloader__bottom">
            <span className="mono">Portfolio © {new Date().getFullYear()}</span>
            <span className="preloader__count">{String(count).padStart(3, "0")}</span>
          </div>

          <div className="preloader__bar" style={{ transform: `scaleX(${count / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
