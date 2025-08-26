import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ToRead from "./pages/ToRead";
import Recommendations from "./pages/Recommendations";
import Favs from "./pages/Favs";
import Finished from "./pages/Finished";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/to-read" element={<ToRead />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/favs" element={<Favs />} />
        <Route path="/finished" element={<Finished />} />
      </Routes>
    </Router>
  );
}

export default App;
