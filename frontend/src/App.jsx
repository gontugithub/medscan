import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MobileLayout } from './components/MobileLayout';

// Páginas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import PatientHomePage from './pages/PatientHomePage';
import AlarmPage from './pages/AlarmPage';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/home" element={<PatientHomePage />} />
          <Route path="/alarm" element={<AlarmPage />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;