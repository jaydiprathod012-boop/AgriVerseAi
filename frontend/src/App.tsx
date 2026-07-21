import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import WeatherIntelligence from './pages/WeatherIntelligence';
import YieldPrediction from './pages/YieldPrediction';
import MandiPrices from './pages/MandiPrices';
import VoiceAssistant from './pages/VoiceAssistant';
import NearbyShops from './pages/NearbyShops';
import SchemesFinder from './pages/SchemesFinder';
import EquipmentRental from './pages/EquipmentRental';
import Marketplace from './pages/Marketplace';
import FarmAnalytics from './pages/FarmAnalytics';
import SatelliteMonitoring from './pages/SatelliteMonitoring';
import Notifications from './pages/Notifications';
import React from 'react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050c08]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-green-400 text-sm">AgriVerse AI Loading...</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f2318',
              color: '#f0fdf4',
              border: '1px solid rgba(34,197,94,0.3)'
            }
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="disease" element={<DiseaseDetection />} />
            <Route path="weather" element={<WeatherIntelligence />} />
            <Route path="yield" element={<YieldPrediction />} />
            <Route path="mandi" element={<MandiPrices />} />
            <Route path="assistant" element={<VoiceAssistant />} />
            <Route path="shops" element={<NearbyShops />} />
            <Route path="schemes" element={<SchemesFinder />} />
            <Route path="equipment" element={<EquipmentRental />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="analytics" element={<FarmAnalytics />} />
            <Route path="satellite" element={<SatelliteMonitoring />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
