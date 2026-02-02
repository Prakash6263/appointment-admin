import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import AddPartner from './pages/AddPartner';
import Membership from './pages/Membership';
import AddMembership from './pages/AddMembership';
import Payments from './pages/Payments';
import Invoice from './pages/Invoice';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - accessible only when NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes - accessible only when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/add-partner" element={<AddPartner />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/add-membership" element={<AddMembership />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/invoice" element={<Invoice />} />
          </Route>
        </Route>

        {/* Fallback - redirect to dashboard if logged in, otherwise to login */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
