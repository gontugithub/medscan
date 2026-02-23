import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 relative w-full h-full bg-background-light">
      <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[50%] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-8 z-10">
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined absolute top-0 left-0 text-5xl text-primary font-bold">crop_free</span>
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative z-10 border border-primary/20">
            <span className="material-symbols-outlined text-6xl text-primary -rotate-45">pill</span>
          </div>
          <div className="absolute w-full h-full border-2 border-primary/30 rounded-full animate-ping opacity-20" />
        </div>

        <div className="space-y-4">
          <h1 className="text-text-main text-4xl sm:text-5xl font-black tracking-tight">MedScan</h1>
          <p className="text-slate-600 text-xl font-medium max-w-[300px] mx-auto">
            Escanea, entiende y nunca olvides tu medicación
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 pb-8 z-10">
        <button onClick={() => navigate('/login')} className="w-full h-16 bg-primary hover:bg-primary-dark text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all">
          Iniciar sesión
        </button>
        <button onClick={() => navigate('/register')} className="w-full h-16 border-2 border-primary/30 text-primary text-xl font-bold rounded-xl active:bg-primary/5 transition-all">
          Registrarse
        </button>
        <p className="text-text-sub text-sm font-medium text-center uppercase tracking-widest opacity-70">Demo hackathon</p>
      </div>
    </div>
  );
};

export default LandingPage;