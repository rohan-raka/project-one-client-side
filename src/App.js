import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Plane from './pages/PlaneAnimationSVG';
import Sites from './pages/Sites';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

import ProtectedRoute from './pages/ProtectedRoute';
import PublicRoute from './pages/PublicRoute';
import AdminProtectedRoute from './pages/AdminProtectedRoute'; // ✅ New

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/about" element={<About />} />

        <Route path="/sites" element={<ProtectedRoute><Sites /></ProtectedRoute>} />
        <Route path="/plane" element={<ProtectedRoute><Plane /></ProtectedRoute>} />

        <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
