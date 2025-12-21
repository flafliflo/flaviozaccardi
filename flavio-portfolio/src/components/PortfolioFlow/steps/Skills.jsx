export default function Skills({ go }) {
  return (
    <>
      <h1 className="heroTitle">Was kann ich denn alles schon?</h1>

      <p className="heroLead">
        Ich arbeite bei uns in der Firma vorallem am entwickeln unseres ERP systemes mit unseren eigenen Programmiersprache BormScript die ist sehr ähnlich wie Java Script
      </p>

      <div className="skillGrid">
        <div className="skillCard">
          <div className="skillTop">⚛️ React</div>
          <div className="skillTxt">Komponenten, Props/State, Struktur</div>
        </div>

        <div className="skillCard">
          <div className="skillTop">🎨 SCSS</div>
          <div className="skillTxt">Variables, Layout, Responsive Styles</div>
        </div>

        <div className="skillCard">
          <div className="skillTop">🧠 UX / UI</div>
          <div className="skillTxt">Lesbarkeit, Abstände, Micro-Interactions</div>
        </div>

        <div className="skillCard">
          <div className="skillTop">🛠️ Tools</div>
          <div className="skillTxt">VS Code, GitHub, Vite, Debugging</div>
        </div>
      </div>

      <div className="heroActions">
        <button className="btn" onClick={() => go(0)} type="button">
          ← Wer ich bin
        </button>
        <button className="btn btn--primary" onClick={() => go(2)} type="button">
          Kontakt →
        </button>
      </div>
    </>
  );
}
