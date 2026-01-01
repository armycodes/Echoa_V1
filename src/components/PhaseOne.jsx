import "../styles/PhaseOne.css";
import bg from "../assets/phase1-bg.jpeg";
import { useNavigate } from "react-router-dom";



export default function PhaseOne() {
  const navigate = useNavigate();

  return (
    <div className="phase1-root">
      {/* Background image */}
      <img src={bg} alt="Echoa mood" className="phase1-bg" />

      {/* Dark overlay */}
      <div className="phase1-overlay" />

      {/* CTA */}
      <button
        className="phase1-btn"
        onClick={() => navigate("/player")}
      >
        Feel Echoa
      </button>
    </div>
  );
}
