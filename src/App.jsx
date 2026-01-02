import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Bootstrap from "./pages/Bootstrap";
import Home from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bootstrap" element={<Bootstrap />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
