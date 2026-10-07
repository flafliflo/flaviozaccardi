import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import useMediaQuery from "../hooks/useMediaQuery";
import { scrollToTarget } from "../hooks/useSmoothScroll";
import { MaskHeading, SectionLabel } from "./Reveal";

const ITEMS = [
  {
    kicker: "Borm Informatik",
    title: "ERP-Entwicklung",
    text: "Im Lehrbetrieb arbeite ich direkt am ERP-System mit: neue Funktionen, Anpassungen und Fehlersuche in BormScript.",
    tags: ["BormScript", "ERP", "Praxis"],
    art: "orbit",
  },
  {
    kicker: "Side Project",
    title: "Diese Website",
    text: "Von Grund auf mit React gebaut: eigene Animationen, Smooth Scrolling, interaktives Canvas und ein Custom Cursor.",
    tags: ["React", "Framer Motion", "SCSS"],
    art: "grid",
    href: "https://github.com/flafliflo/flaviozaccardi",
  },
  {
    kicker: "Ausbildung · GIBZ",
    title: "Applikations­entwickler",
    text: "3. Lehrjahr: Praxis im Betrieb, Berufsschule an der GIBZ in Zug und überbetriebliche Kurse. Jeden Tag ein bisschen besser.",
    tags: ["Lehre", "GIBZ", "3. Lehrjahr"],
    art: "rings",
  },
];

function Art({ type }) {
  return (
    <div className={`art art--${type}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Panel({ item, index }) {
  const Tag = item.href ? "a" : "article";
  const linkProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer", "data-cursor": "Ansehen" }
    : {};

  return (
    <Tag className="panel" {...linkProps}>
      <div className="panel__visual">
        <Art type={item.art} />
        <span className="panel__num">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="panel__body">
        <span className="mono panel__kicker">{item.kicker}</span>
        <h3 className="panel__title">{item.title}</h3>
        <p className="panel__text">{item.text}</p>
        <div className="panel__tags">
          {item.tags.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  );
}

function EndPanel() {
  return (
    <div className="panel panel--end">
      <span className="mono panel__kicker">Nächstes Kapitel</span>
      <p className="panel__endTitle">Dein Projekt?</p>
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => scrollToTarget("#contact")}
      >
        <span className="roll"><span className="roll__inner" data-text="Lass uns reden">Lass uns reden</span></span>
      </button>
    </div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const desktop = useMediaQuery("(min-width: 900px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  // Wie weit die Spur seitlich wandern muss, bis das letzte Panel sichtbar ist
  useLayoutEffect(() => {
    if (!desktop) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(track.scrollWidth - window.innerWidth, 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const panels = (
    <>
      {ITEMS.map((item, i) => (
        <Panel item={item} index={i} key={item.title} />
      ))}
      <EndPanel />
    </>
  );

  return (
    <section
      className="work"
      id="work"
      ref={ref}
      style={desktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={desktop ? "work__sticky" : "work__static"}>
        <div className="container work__head">
          <SectionLabel index="03">Was ich mache</SectionLabel>
          <MaskHeading lines={["Ausgewählte", "Arbeit."]} />
        </div>

        {desktop ? (
          <>
            <motion.div className="work__track" ref={trackRef} style={{ x }}>
              {panels}
            </motion.div>
            <div className="container">
              <div className="work__progress">
                <motion.div className="work__progressFill" style={{ scaleX: smooth }} />
              </div>
            </div>
          </>
        ) : (
          <div className="container work__list">{panels}</div>
        )}
      </div>
    </section>
  );
}
