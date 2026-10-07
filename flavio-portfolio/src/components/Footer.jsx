import { scrollToTarget } from "../hooks/useSmoothScroll";
import { GITHUB, LINKEDIN, MAILTO } from "../data/contact";

const NAV = [
  { href: "#about", label: "Über mich" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Arbeit" },
  { href: "#hobbies", label: "Hobbys" },
  { href: "#contact", label: "Kontakt" },
];

const SOCIAL = [
  { href: MAILTO, label: "E-Mail" },
  { href: GITHUB, label: "GitHub", external: true },
  { href: LINKEDIN, label: "LinkedIn", external: true },
];

function RollLink({ label, ...props }) {
  return (
    <a className="roll footer__link" {...props}>
      <span className="roll__inner" data-text={label}>
        {label}
      </span>
    </a>
  );
}

export default function Footer() {
  const go = (href) => (e) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__claim">
            Applikationsentwickler in Ausbildung. <span>Offen für Neues.</span>
          </p>

          <nav className="footer__col" aria-label="Fusszeilen-Navigation">
            <span className="mono footer__heading">Seiten</span>
            {NAV.map((l) => (
              <RollLink key={l.href} href={l.href} label={l.label} onClick={go(l.href)} />
            ))}
          </nav>

          <div className="footer__col">
            <span className="mono footer__heading">Kontakt</span>
            {SOCIAL.map((l) => (
              <RollLink
                key={l.label}
                href={l.href}
                label={l.label}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              />
            ))}
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          Zaccardi<span>.</span>
        </div>

        <div className="footer__bottom">
          <span className="mono">© {new Date().getFullYear()} Flavio Mattia Zaccardi</span>
          <button
            type="button"
            className="footer__up"
            onClick={() => scrollToTarget("#top")}
            aria-label="Nach oben scrollen"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
