import React from 'react';
import { useNavigate } from 'react-router-dom';

// IMPORTANTE: Asegúrate de que la ruta coincida con donde guardaste MedScanLogo.jsx
import MedScanLogo from '../components/MedScan_Logo.jsx'; 

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-8 py-12 min-h-screen">

      {/* Logo + Texto central */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        
        {/* Aquí usas tu componente Logo */}
        <MedScanLogo className="w-28 h-28" />

        <div className="flex flex-col gap-3">
          <h1 className="text-6xl font-black text-text-main tracking-tight">
            MedScan
          </h1>
          <p className="text-xl font-medium text-slate-500 max-w-[280px] leading-relaxed mx-auto">
            Escanea, entiende y nunca olvides tu medicación
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="w-full flex flex-col gap-4 pb-10">
        <button
          onClick={() => navigate('/login')}
          className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-[0_8px_24px_rgba(25,118,210,0.3)] active:scale-95 transition-transform"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate('/register')}
          className="w-full h-16 bg-transparent border-2 border-primary text-primary text-xl font-bold rounded-2xl active:bg-primary/5 transition-colors"
        >
          Registrarse
        </button>
      </div>

    </div>
  );
}