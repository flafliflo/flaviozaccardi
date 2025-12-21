import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TreeStepper from "./TreeStepper";
import Who from "./steps/Who";
import Skills from "./steps/Skills";
import Contact from "./steps/Contact";

const variants = {
  initial: (dir) => ({ opacity: 0, y: dir > 0 ? 18 : -18, filter: "blur(6px)" }),
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -18 : 18, filter: "blur(6px)" }),
};

export default function PortfolioFlow() {
  const labels = useMemo(() => ["Wer ich bin", "Was ich kann", "Kontakt"], []);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const next = () => step < 2 && go(step + 1);
  const prev = () => step > 0 && go(step - 1);

  return (
    <section className="flowWrap">
      <div className="flowBgOrbs" aria-hidden="true">
        <div className="orb orbA" />
        <div className="orb orbB" />
        <div className="orb orbC" />
      </div>

      <div className="container">
        <div className="flowGrid">
          <TreeStepper step={step} setStep={go} labels={labels} />

          <div className="stage">
            <div className="stageTop">
              <div className="stageKicker">
                <span className="kBadge">Portfolio</span>
                <span className="kSep">•</span>
                <span className="kMuted">{labels[step]}</span>
              </div>

              <div className="stageNav">
                <button className="btn" onClick={prev} disabled={step === 0} type="button">
                  ← Zurück
                </button>
                <button
                  className="btn btn--primary"
                  onClick={next}
                  disabled={step === 2}
                  type="button"
                >
                  Weiter →
                </button>
              </div>
            </div>

            <div className="stageCard">
              <AnimatePresence mode="wait" custom={dir}>
                {step === 0 && (
                  <motion.div
                    key="who"
                    custom={dir}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Who go={go} />
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="skills"
                    custom={dir}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Skills go={go} />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="contact"
                    custom={dir}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Contact go={go} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="stageBottom">
              <div className="progress">
                <div className="progressBar">
                  <motion.div
                    className="progressFill"
                    initial={false}
                    animate={{ width: `${((step + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="progressTxt">Schritt {step + 1} / 3</div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
