import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Loading from "./pages/Loading";
import Bootstrap from "./pages/Bootstrap";
import PhaseOne from "./components/PhaseOne";
import Player from "./components/Player";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bootstrap" element={<Bootstrap />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/home" element={<Home />} />
       <Route path="/" element={<PhaseOne />} />
       <Route path="/player" element={<Player />} />
    </Routes>
  );
}
