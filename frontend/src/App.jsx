import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import PatientNoCaregiverPage from './pages/PatientNoCaregiverPage';
import DashboardPage from './pages/DashboardPage';
import AddPatientPage from './pages/AddPatientPage';
import PatientProfilePage from './pages/PatientProfilePage';
import PatientHomePage from './pages/PatientHomePage';
import CameraPage from './pages/CameraPage';
import ProcessingPage from './pages/ProcessingPage';
import ChatPage from './pages/ChatPage';
import MedicationListPage from './pages/MedicationListPage';
import MedicineDetailPage from './pages/MedicineDetailPage';
import AlarmPage from './pages/AlarmPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChatPageMedico from './pages/ChatPageMedico';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="mobile-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role" element={<RoleSelectionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-patient" element={<AddPatientPage />} />
          <Route path="/profile" element={<PatientProfilePage />} />
          <Route path="/home" element={<PatientHomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/medications" element={<MedicationListPage />} />
          <Route path="/medicine-detail" element={<MedicineDetailPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/chat-medico" element={<ChatPageMedico />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}