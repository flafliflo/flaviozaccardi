export default function Contact({ go }) {
  return (
    <>
      <h1 className="heroTitle">Kontakt</h1>

      <p className="heroLead">Schreib mir direkt oder schau dir meine Projekte auf GitHub an.</p>

      <div className="contactGrid">
        <a
          className="contactCard"
          href="mailto:flavio.zaccardi@bluewin.ch?subject=Kontakt%20%C3%BCber%20Portfolio&body=Hallo%20Flavio%2C"
        >
          <div className="cIcon">📧</div>
          <div>
            <div className="cTop">E-Mail</div>
            <div className="cVal">flavio.zaccardi@bluewin.ch</div>
          </div>
          <div className="cGo">→</div>
        </a>

        <a
          className="contactCard"
          href="https://github.com/flafliflo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="cIcon">💻</div>
          <div>
            <div className="cTop">GitHub</div>
            <div className="cVal">github.com/flafliflo</div>
          </div>
          <div className="cGo">→</div>
        </a>
      </div>

      <div className="heroActions">
        <button className="btn" onClick={() => go(1)} type="button">
          ← Skills
        </button>

        <a
          className="btn btn--primary"
          href="mailto:flavio.zaccardi@bluewin.ch?subject=Kontakt%20%C3%BCber%20Portfolio&body=Hallo%20Flavio%2C"
        >
          Jetzt Mail schreiben →
        </a>
      </div>

    </>
  );
}
