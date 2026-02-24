import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa todas las páginas (Asegúrate de crearlas en src/pages/)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import PatientNoCaregiverPage from './pages/PatientNoCaregiverPage';
import DashboardPage from './pages/DashboardPage';
import AddPatientPage from './pages/AddPatientPage';
import PatientProfilePage from './pages/PatientProfilePage';
import AddMedicationPage from './pages/AddMedicationPage';
import PatientHomePage from './pages/PatientHomePage';
import CameraPage from './pages/CameraPage';
import ProcessingPage from './pages/ProcessingPage';
import ChatPage from './pages/ChatPage';
import MedicationListPage from './pages/MedicationListPage';
import AlarmPage from './pages/AlarmPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* Contenedor que simula la pantalla del móvil centrada en PC */}
      <div className="mobile-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role" element={<RoleSelectionPage />} />
          <Route path="/patient-empty" element={<PatientNoCaregiverPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-patient" element={<AddPatientPage />} />
          <Route path="/profile" element={<PatientProfilePage />} />
          <Route path="/add-medication" element={<AddMedicationPage />} />
          <Route path="/home" element={<PatientHomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/medications" element={<MedicationListPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}