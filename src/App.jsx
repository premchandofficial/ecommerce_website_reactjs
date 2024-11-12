import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Cartpage from "./pages/Cartpage";
import Nopage from "./pages/Nopage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cartpage" element={<Cartpage />} />

          <Route path="/nopage" element={<Nopage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
