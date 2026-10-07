import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Magnetic from "./Magnetic";
import Reveal, { SectionLabel } from "./Reveal";

const EMAIL = "flavio.zacc08@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Kontakt%20%C3%BCber%20Portfolio&body=Hallo%20Flavio%2C`;
const EASE = [0.16, 1, 0.3, 1];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <SectionLabel index="05">Kontakt</SectionLabel>

        <motion.h2
          className="contact__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["Lass uns", "etwas bauen."].map((line, i) => (
            <span className="maskHeading__mask" key={line}>
              <motion.span
                className="maskHeading__line"
                variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
                transition={{ duration: 1.2, ease: EASE, delay: i * 0.12 }}
              >
                {i === 1 ? (
                  <>
                    etwas <em>bauen.</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <div className="contact__row">
          <Reveal className="contact__circleWrap" delay={0.2}>
            <Magnetic strength={0.5}>
              <a className="contact__circle" href={MAILTO} data-cursor="Mail">
                <span>Schreib</span>
                <span>mir</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </Magnetic>
          </Reveal>

          <div className="contact__links">
            <Reveal delay={0.1}>
              {/* Klick auf die Adresse öffnet das Mail-Programm, der Button daneben kopiert sie */}
              <div className="contactLink">
                <span className="mono contactLink__label">E-Mail</span>
                <a className="contactLink__value is-email" href={MAILTO} data-cursor="Mail">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "copied" : "email"}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {copied ? "Kopiert ✓" : EMAIL}
                    </motion.span>
                  </AnimatePresence>
                </a>
                <button
                  type="button"
                  className="contactLink__copy"
                  onClick={copy}
                  data-cursor="Kopieren"
                  aria-label="E-Mail-Adresse kopieren"
                  title="E-Mail-Adresse kopieren"
                >
                  ⧉
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                className="contactLink"
                href="https://github.com/flafliflo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono contactLink__label">GitHub</span>
                <span className="contactLink__value">github.com/flafliflo</span>
                <span className="contactLink__arrow">↗</span>
              </a>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                className="contactLink"
                href="https://www.linkedin.com/in/flavio-mattia-zaccardi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono contactLink__label">LinkedIn</span>
                <span className="contactLink__value">in/flavio-mattia-zaccardi</span>
                <span className="contactLink__arrow">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
