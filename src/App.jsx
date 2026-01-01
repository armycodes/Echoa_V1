import { Routes, Route } from "react-router-dom";
import PhaseOne from "./components/PhaseOne";
import Home from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PhaseOne />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
