import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PhaseOne from "./components/PhaseOne";
import Home from "./components/Home";
import Player from "./components/Player";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PhaseOne />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  );
}
