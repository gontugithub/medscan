import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PatientHomePage from './pages/PatientHomePage';
import CameraPage from './pages/CameraPage';
import MedicationInfoPage from './pages/MedicationInfoPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patient" element={<PatientHomePage />} />
        <Route path="/scan" element={<CameraPage />} />
        <Route path="/medication-info" element={<MedicationInfoPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;