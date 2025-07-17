import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Plane from './pages/Plane';
import Sites from './pages/Sites'; // Ensure this file exists in ./pages/
import Dashboard from './pages/Dashboard'; // Ensure this file exists in ./pages/
// Optional: Uncomment the next line if Sites is a valid page
// import Sites from './pages/Sites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Uncomment this if Sites.js exists in ./pages/ */}
        <Route path="/sites" element={<Sites />} />
        <Route path="/plane" element={<Plane />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
