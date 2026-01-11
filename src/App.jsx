import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Bootstrap from "./pages/Bootstrap";
import Home from "./components/Home";
import Guest from "./components/Guest";
import LandingPage from './pages/LandingPage'; // Import the new page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bootstrap" element={<Bootstrap />} />
      <Route path="/home" element={<Home />} />
      <Route path="/guest" element={<Guest />} />

      
    </Routes>
  );
}
