import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación del Layout
import { MobileLayout } from './components/MobileLayout';

// Importación de Páginas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PatientHomePage from './pages/PatientHomePage';
import CameraPage from './pages/CameraPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<PatientHomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;