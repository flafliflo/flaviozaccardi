import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Blendet Inhalte beim Reinscrollen ein (einmalig).
export default function Reveal({ children, delay = 0, y = 40, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

// Überschrift, deren Zeilen von unten aus einer Maske gleiten.
// Der Trigger sitzt auf dem <h2>: die Zeilen selbst sind weggeclippt und würden nie "sichtbar".
export function MaskHeading({ lines, className = "" }) {
  return (
    <motion.h2
      className={`maskHeading ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((line, i) => (
        <span className="maskHeading__mask" key={i}>
          <motion.span
            className="maskHeading__line"
            variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <Reveal className="sectionLabel" y={16}>
      <span className="mono sectionLabel__index">{index}</span>
      <span className="sectionLabel__line" />
      <span className="mono">{children}</span>
    </Reveal>
  );
}
