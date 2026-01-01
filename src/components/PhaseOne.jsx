import "../styles/PhaseOne.css";

export default function PhaseOne({ onEnter }) {
  return (
    <div className="phaseone-root">
      {/* Background image */}
      <div className="phaseone-bg" />

      {/* Soft overlay */}
      <div className="phaseone-overlay" />

      {/* Content */}
      <div className="phaseone-content">
        <button className="feel-btn" onClick={onEnter}>
          Feel Echoa
        </button>
      </div>
    </div>
  );
}
