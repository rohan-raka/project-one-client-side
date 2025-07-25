import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Plane from './pages/PlaneAnimationSVG';
import Sites from './pages/Sites';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './pages/ProtectedRoute';
import PublicRoute from './pages/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute><Home /></PublicRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/sites" element={
          <ProtectedRoute><Sites /></ProtectedRoute>
        } />
        <Route path="/plane" element={
          <ProtectedRoute><Plane /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
