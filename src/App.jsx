import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Loading from "./pages/Loading";



function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/bootstrap" element={<Bootstrap />} />
  <Route path="/loading" element={<Loading />} />
  <Route path="/home" element={<Home />} />
</Routes>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
