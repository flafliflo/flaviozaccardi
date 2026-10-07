import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const [state, setState] = useState({ hover: false, label: "", down: false });

  useEffect(() => {
    if (!finePointer) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest("a, button, [data-cursor]");
      setState((s) => ({
        ...s,
        hover: Boolean(el),
        label: el?.dataset.cursor || "",
      }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  const size = state.label ? 96 : state.hover ? 64 : 36;

  return (
    <>
      <motion.div className="cursor__dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className={`cursor__ring ${state.hover ? "is-hover" : ""} ${state.label ? "has-label" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{ width: size, height: size, scale: state.down ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        aria-hidden="true"
      >
        {state.label && <span>{state.label}</span>}
      </motion.div>
    </>
  );
}
