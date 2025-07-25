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
        {/* Public Home Route */}
        <Route path="/" element={
          <PublicRoute><Home /></PublicRoute>
        } />

        {/* Public About Page */}
        <Route path="/about" element={<About />} />

        {/* Protected User Routes */}
        <Route path="/sites" element={
          <ProtectedRoute><Sites /></ProtectedRoute>
        } />
        <Route path="/plane" element={
          <ProtectedRoute><Plane /></ProtectedRoute>
        } />

        {/* ✅ Admin-Only Dashboard */}
        <Route path="/dashboard" element={
          <AdminProtectedRoute><Dashboard /></AdminProtectedRoute>
        } />

        {/* Admin Login Page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
