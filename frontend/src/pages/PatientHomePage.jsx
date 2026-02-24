import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientHomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="flex-1 flex flex-col p-6">
      <header className="pt-8 mb-10">
        <h1 className="text-4xl font-black text-text-main tracking-tight">Hola, Paca</h1>
      </header>
      
      <div className="flex-1 flex flex-col gap-6 justify-center pb-10">
        <button 
          onClick={() => navigate('/camera')} 
          className="w-full bg-primary text-white h-[220px] rounded-[2rem] shadow-[0_12px_32px_rgba(25,118,210,0.3)] flex flex-col items-center justify-center gap-4 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[80px]">photo_camera</span>
          <span className="text-3xl font-bold">Escanear<br/>medicamento</span>
        </button>
        
        <button 
          onClick={() => navigate('/medications')} 
          className="w-full bg-white text-primary border-4 border-slate-100 h-[180px] rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-4 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[64px] text-slate-800">list_alt</span>
          <span className="text-2xl font-bold text-text-main">Mis medicamentos</span>
        </button>
      </div>
    </div>
  );
}