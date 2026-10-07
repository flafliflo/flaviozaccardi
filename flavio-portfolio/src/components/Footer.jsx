import { scrollToTarget } from "../hooks/useSmoothScroll";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="mono">© {new Date().getFullYear()} Flavio Mattia Zaccardi</span>
        <span className="mono footer__made">Mit React & viel Kaffee gebaut</span>
        <button type="button" className="footer__top roll" onClick={() => scrollToTarget("#top")}>
          <span className="roll__inner mono" data-text="Nach oben ↑">
            Nach oben ↑
          </span>
        </button>
      </div>
      <div className="footer__giant" aria-hidden="true">
        ZACCARDI
      </div>
    </footer>
  );
}
