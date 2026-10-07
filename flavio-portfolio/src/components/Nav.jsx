import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

import { scrollToTarget } from "../hooks/useSmoothScroll";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "#about", label: "Über mich" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Arbeit" },
  { href: "#contact", label: "Kontakt" },
];
const EASE = [0.16, 1, 0.3, 1];

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Zurich",
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav({ ready }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const time = useClock();

  // Beim Runterscrollen ausblenden, beim Hochscrollen wieder zeigen
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: "-120%" }}
        animate={{ y: ready && (!hidden || open) ? "0%" : "-120%" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <a className="nav__logo" href="#top" onClick={go("#top")} aria-label="Nach oben">
          <span className="nav__logoMark">FZ</span>
          <span className="nav__logoText">
            Flavio <span>Zaccardi</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Hauptnavigation">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)} className="roll">
              <span className="roll__inner" data-text={l.label}>
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <span className="mono nav__time">ZRH {time}</span>
          <Magnetic>
            <a className="nav__cta" href="#contact" onClick={go("#contact")}>
              <span className="pulse" /> Verfügbar
            </a>
          </Magnetic>
          <button
            type="button"
            className={`nav__burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menü"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className="menu__link"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE }}
              >
                <span className="mono">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
