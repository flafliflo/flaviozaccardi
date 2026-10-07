import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

import Reveal, { MaskHeading, SectionLabel } from "./Reveal";

const SKILLS = [
  {
    title: "ERP-Entwicklung",
    tag: "BormScript",
    text: "Täglich im Einsatz: Ich erweitere und pflege unser ERP-System mit BormScript, einer JavaScript-ähnlichen Firmensprache.",
    size: "lg",
    icon: "◆",
  },
  {
    title: "React",
    tag: "Frontend",
    text: "Komponenten, Props & State, saubere Struktur.",
    icon: "⚛",
  },
  {
    title: "SCSS",
    tag: "Styling",
    text: "Variablen, Layouts, responsive Styles.",
    icon: "✱",
  },
  {
    title: "UX / UI",
    tag: "Design",
    text: "Lesbarkeit, Abstände und Micro-Interactions, die Spass machen.",
    icon: "◐",
  },
  {
    title: "Tools",
    tag: "Workflow",
    text: "VS Code, Git & GitHub, Vite, Debugging.",
    icon: "⌘",
  },
  {
    title: "Python",
    tag: "Sprache",
    text: "Skripte, Automatisierung und kleine Tools.",
    icon: "≈",
  },
  {
    title: "C#",
    tag: "Sprache",
    text: "Objektorientiert programmieren mit .NET.",
    icon: "#",
  },
  {
    title: "SQL",
    tag: "Datenbanken",
    text: "Abfragen, Joins und saubere Datenmodelle.",
    icon: "▤",
  },
  {
    title: "Rust",
    tag: "Am Lernen",
    text: "Gerade dabei: Ownership, Borrowing und schneller, sicherer Code.",
    icon: "⚙",
    learning: true,
  },
];

// Karte mit 3D-Tilt und einem Licht-Spot, der dem Cursor folgt.
function TiltCard({ skill, index }) {
  const ref = useRef(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(212,255,58,0.16), transparent 60%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}% ${my}%, rgba(212,255,58,0.9), transparent 60%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal className={`skillCell ${skill.size ? `is-${skill.size}` : ""}`} delay={index * 0.08}>
      <motion.article
        ref={ref}
        className="skillCard"
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <motion.div className="skillCard__border" style={{ background: border }} aria-hidden="true" />
        <motion.div className="skillCard__spot" style={{ background: spotlight }} aria-hidden="true" />
        <div className="skillCard__inner">
          <div className="skillCard__top">
            <span className="skillCard__icon">{skill.icon}</span>
            <span className={`mono skillCard__tag ${skill.learning ? "is-learning" : ""}`}>
              {skill.learning && <span className="pulse" />}
              {skill.tag}
            </span>
          </div>
          <div>
            <h3 className="skillCard__title">{skill.title}</h3>
            <p className="skillCard__text">{skill.text}</p>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionLabel index="02">Skills</SectionLabel>
        <div className="sectionHead">
          <MaskHeading lines={["Was ich", "schon kann."]} />
          <Reveal as="p" className="sectionHead__lead" delay={0.2}>
            Ein Mix aus echter Praxis im Betrieb und Projekten, die ich aus Neugier selbst baue.
          </Reveal>
        </div>

        <div className="bento">
          {SKILLS.map((s, i) => (
            <TiltCard skill={s} index={i} key={s.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
