import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

import useMediaQuery from "../hooks/useMediaQuery";
import TRAVEL_PHOTOS from "../data/travel";
import PixelArt from "./PixelArt";
import Reveal, { MaskHeading, SectionLabel } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1];

const PLANE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2 16l20-8-6 13-3-6-6-1z" />
    <path d="M13 15l3-3" />
  </svg>
);

const HOBBIES = [
  {
    id: "travel",
    title: "Reisen",
    text: "Neue Orte entdecken, andere Kulturen kennenlernen und den Kopf frei bekommen.",
    tag: "Unterwegs",
  },
  {
    id: "gym",
    title: "Gym",
    text: "Regelmässig im Gym. Disziplin und Dranbleiben gelten beim Training genauso wie beim Code.",
    tag: "Disziplin",
  },
  {
    id: "f1",
    title: "Formel 1",
    text: "Kein Rennwochenende ohne F1: Strategie, Technik und Tempo am Limit.",
    tag: "Speed",
  },
  {
    id: "football",
    title: "Fussball",
    text: "Grosser Fussballfan. Ich verfolge die Spiele mit voller Leidenschaft.",
    tag: "Leidenschaft",
  },
];

function Preview({ id }) {
  if (id === "travel" && TRAVEL_PHOTOS[0]) {
    return <img src={TRAVEL_PHOTOS[0].src} alt="" />;
  }
  return (
    <div className={`hobbyPreview__art hobbyPreview__art--${id}`}>
      <PixelArt name={id} fast className="hobbyPreview__pixel" />
    </div>
  );
}

// Liste mit grossen Zeilen; auf Desktop folgt eine Vorschau-Karte dem Cursor.
function HobbyList() {
  const desktop = useMediaQuery("(hover: hover) and (min-width: 900px)");
  const listRef = useRef(null);
  const [active, setActive] = useState(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 26, mass: 0.5 });

  const onMove = (e) => {
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      className="hobbyList"
      ref={listRef}
      onPointerMove={desktop ? onMove : undefined}
      onPointerLeave={() => setActive(null)}
    >
      {HOBBIES.map((h, i) => (
        <Reveal key={h.id} delay={i * 0.06} y={30}>
          <div className="hobbyRow" onPointerEnter={() => setActive(h.id)}>
            <span className="mono hobbyRow__num">0{i + 1}</span>
            <span className="hobbyRow__icon">
              <PixelArt name={h.id} fast={active === h.id} />
            </span>
            <h3 className="hobbyRow__title">{h.title}</h3>
            <p className="hobbyRow__text">{h.text}</p>
            <span className="chip hobbyRow__tag">{h.tag}</span>
          </div>
        </Reveal>
      ))}

      {desktop && (
        <motion.div className="hobbyPreview" style={{ x, y }} aria-hidden="true">
          <AnimatePresence>
            {active && (
              <motion.div
                key={active}
                className="hobbyPreview__card"
                initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotate: 8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Preview id={active} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

// Zieh-Galerie für Reisefotos (oder Platzhalter, solange keine Bilder da sind).
function TravelGallery() {
  const wrapRef = useRef(null);
  const touch = useMediaQuery("(pointer: coarse)");
  const photos = TRAVEL_PHOTOS.length
    ? TRAVEL_PHOTOS
    : Array.from({ length: 5 }, (_, i) => ({ placeholder: true, place: `Reise ${i + 1}` }));

  return (
    <div className="travel">
      <div className="travel__head">
        <Reveal as="h3" className="travel__title">
          Unterwegs<span>.</span>
        </Reveal>
        <Reveal className="mono travel__hint" delay={0.1}>
          {touch ? "Wischen →" : "← Ziehen zum Entdecken →"}
        </Reveal>
      </div>

      <div className={`travel__viewport ${touch ? "is-touch" : ""}`} ref={wrapRef}>
        <motion.div
          className="travel__track"
          drag={touch ? false : "x"}
          dragConstraints={wrapRef}
          dragElastic={0.12}
          data-cursor={touch ? undefined : "Ziehen"}
        >
          {photos.map((p, i) => (
            <motion.figure
              className={`travelCard ${p.placeholder ? "is-placeholder" : ""} ${p.wide ? "is-wide" : ""}`}
              key={p.src || p.place}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
            >
              {p.placeholder ? (
                <div className="travelCard__placeholder">
                  {PLANE_ICON}
                  <span className="mono">Foto folgt</span>
                </div>
              ) : (
                <img src={p.src} alt={p.place} draggable="false" decoding="async" />
              )}
              <figcaption>
                <span>{p.place}</span>
                {p.country && <span className="mono">{p.country}</span>}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function Hobbies() {
  return (
    <section className="hobbies section" id="hobbies">
      <div className="container">
        <SectionLabel index="04">Abseits vom Code</SectionLabel>
        <div className="sectionHead">
          <MaskHeading lines={["Was mich", "antreibt."]} />
          <Reveal as="p" className="sectionHead__lead" delay={0.2}>
            Wenn ich nicht programmiere, bin ich unterwegs, im Gym oder fiebere bei F1 und Fussball mit.
          </Reveal>
        </div>

        <HobbyList />
        <TravelGallery />
      </div>
    </section>
  );
}
