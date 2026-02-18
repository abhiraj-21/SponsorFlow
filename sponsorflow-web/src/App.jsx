
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/dashboard/index';
import PlaceholderPage from './pages/PlaceholderPage';
import ProfileSettings from './pages/ProfileSettings';
import MyOffers from './pages/brand/MyOffers';
import InfluencerDiscovery from './pages/brand/InfluencerDiscovery';
import Campaigns from './pages/Campaigns';
import EarningsHistory from './pages/influencer/EarningsHistory';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Brand Feature Routes */}
              <Route path="/offers" element={<MyOffers />} />
              <Route path="/discovery" element={<InfluencerDiscovery />} />

              {/* Shared Routes (Brand + Influencer) */}
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/settings" element={<ProfileSettings />} />
              <Route path="/profile" element={<ProfileSettings />} />

              {/* Influencer Routes */}
              <Route path="/earnings-history" element={<EarningsHistory />} />
              <Route path="/stats" element={<PlaceholderPage title="Campaign Stats" />} />
              <Route path="/support" element={<PlaceholderPage title="Support" />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
