import React from 'react';
import { useNavigate } from 'react-router-dom';
import MedScanLogo from '../components/MedScan_Logo.jsx'; 

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-8 py-12 min-h-screen bg-white">

      {/* Contenedor Superior (MedScan) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        
        {/* Logo principal de la App */}
        <MedScanLogo className="w-28 h-28" />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-black tracking-tight text-[rgb(24,116,199)]">
            MedScan
          </h1>
          
          <div className="flex flex-col items-center gap-6">
            <p className="text-xl font-medium text-slate-500 max-w-[280px] leading-relaxed mx-auto">
              Escanea, entiende y nunca olvides tu medicación
            </p>
            
            {/* LOGO DE LA EMPRESA (Un poco más grande) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Desarrollado por</span>
              <img 
                src="/logo weagain-sin fondo.svg" 
                alt="WeAgain Logo" 
                className="h-25 w-auto object-contain" // Subido de h-8 a h-12
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="w-full flex flex-col gap-4 pb-10 max-w-sm">
        <button
          onClick={() => navigate('/login')}
          className="w-full h-16 bg-[#1874c7] text-white text-xl font-bold rounded-2xl shadow-[0_8px_24px_rgba(24,116,199,0.3)] active:scale-95 transition-transform"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate('/register')}
          className="w-full h-16 bg-transparent border-2 border-[#1874c7] text-[#1874c7] text-xl font-bold rounded-2xl active:bg-blue-50 transition-colors"
        >
          Registrarse
        </button>
      </div>

    </div>
  );
}