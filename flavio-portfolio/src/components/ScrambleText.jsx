import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_/[]{}—=+*^?#01ABCDEF";

// Wechselt zyklisch durch `words` und "entschlüsselt" jedes Wort Buchstabe für Buchstabe.
export default function ScrambleText({ words, interval = 2800, start = true }) {
  const [text, setText] = useState(words[0]);
  const index = useRef(0);
  const current = useRef(words[0]);

  useEffect(() => {
    if (!start) return;
    let raf;
    let timer;

    const scrambleTo = (target) => {
      const length = Math.max(current.current.length, target.length);
      const queue = Array.from({ length }, (_, i) => ({
        to: target[i] || "",
        start: Math.floor(Math.random() * 18),
        end: Math.floor(Math.random() * 18) + 18,
      }));
      let frame = 0;

      const update = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            out += q.to;
          } else if (frame >= q.start) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += q.to ? " " : "";
          }
        }
        current.current = out;
        setText(out);
        frame++;
        if (done < queue.length) raf = requestAnimationFrame(update);
      };
      update();
    };

    timer = setInterval(() => {
      index.current = (index.current + 1) % words.length;
      scrambleTo(words[index.current]);
    }, interval);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [start, words, interval]);

  return <span className="scramble">{text}</span>;
}
