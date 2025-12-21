export default function TreeStepper({ step, setStep, labels }) {
  return (
    <aside className="tree">
      <div className="treeTitle">Navigation</div>
      <div className="treeLine" />

      <div className="treeNodes">
        {labels.map((label, i) => (
          <div key={label} className="treeNode">
            <div className={`treeDot ${i === step ? "isActive" : i < step ? "isDone" : ""}`} />
            <div>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`stepPill ${i === step ? "isActive" : ""}`}
              >
                <span className="dot" />
                <span className="txt">{label}</span>
              </button>

              {i === step && (
                <div className="treeHint">
                  {i === 0 && "Kurz & persönlich"}
                  {i === 1 && "Skills & Projekte"}
                  {i === 2 && "Mail & GitHub"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
