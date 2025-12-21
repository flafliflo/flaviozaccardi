export default function Who({ go }) {
  return (
    <>
      <div className="heroBadge">Ich bin Flavio Mattia Zaccardi</div>

      <h1 className="heroTitle">
        17 Jahre alt.
        <br />
        Mache die Lehre als Applikationsentwicklung bei Borm Informatik ich bin jetzt gerade im 2. Lehrjahr.
      </h1>

      <p className="heroLead">
        Ich baue gerade meine erste eigene Portfolio-Website. Mir ist wichtig: sauberer Code, modernes
        Design und eine Website, die „wow“ wirkt.
      </p>

      <div className="heroActions">
        <button className="btn btn--primary" onClick={() => go(1)} type="button">
          Was ich kann →
        </button>
        <button className="btn" onClick={() => go(2)} type="button">
          Kontakt
        </button>
      </div>

      <div className="miniFacts">
        <div className="fact">
          <div className="factTop">Fokus</div>
          <div className="factVal">Web & UI</div>
        </div>
        <div className="fact">
          <div className="factTop">Stack</div>
          <div className="factVal">React + SCSS</div>
        </div>
        <div className="fact">
          <div className="factTop">Ziel</div>
          <div className="factVal">Portfolio</div>
        </div>
      </div>
    </>
  );
}
