import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPatientPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] min-h-[100dvh] flex flex-col w-full relative font-display">
      
      {/* Header "CIMA Salud" como en tu foto */}
      <header className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-slate-100 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-[#1775d3]">CIMA Salud</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 py-6 pb-24 space-y-6">
        
        {/* Tarjeta de Añadir Paciente */}
        <section className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-2">Añadir paciente</h2>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            Introduzca el código único para iniciar un nuevo paciente a la ciudad
          </p>
          
          <div className="flex gap-3 mb-4">
            <input 
              type="text" 
              placeholder="Código único" 
              className="flex-1 h-14 px-4 rounded-xl border border-slate-300 text-base outline-none focus:border-[#1775d3] focus:ring-1 focus:ring-[#1775d3]"
            />
            <button className="w-14 h-14 bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors active:scale-95">
              <span className="material-symbols-outlined text-[28px] font-light text-pink-300">add</span>
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full h-14 bg-white border border-[#2563eb] text-[#2563eb] font-medium rounded-xl hover:bg-blue-50 transition-colors active:scale-95"
          >
            Añadir paciente
          </button>
        </section>

        {/* Tarjetas Cuadradas de Pacientes (Como en tu foto) */}
        <section className="grid grid-cols-2 gap-4">
          {/* Card Paca */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100 flex flex-col items-start gap-4 cursor-pointer hover:border-[#1775d3]/30" onClick={() => navigate('/profile')}>
            <div className="w-14 h-14 rounded-full bg-blue-100"></div>
            <div>
              <h3 className="font-bold text-[#1f2937]">Paca López</h3>
              <p className="text-xs text-slate-400">Paciente</p>
            </div>
          </div>

          {/* Card María */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100 flex flex-col items-start gap-4 cursor-pointer hover:border-[#1775d3]/30" onClick={() => navigate('/profile')}>
            <div className="w-14 h-14 rounded-full bg-green-100"></div>
            <div>
              <h3 className="font-bold text-[#1f2937]">María Rodrigo</h3>
              <p className="text-xs text-slate-400">Paciente</p>
            </div>
          </div>
        </section>

        {/* Artículo General */}
        <section className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-[#1f2937] mb-4">Artículo General</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="material-symbols-outlined text-slate-300 text-[20px]">description</span>
              <span className="text-sm">Información</span>
            </div>
            <button className="text-[#2563eb] text-sm font-medium flex items-center gap-1 hover:underline">
              Ver más <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Detalles Manuales (Botón azul cortado en tu foto) */}
        <section className="bg-white rounded-[20px] p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-[#1f2937] mb-4">Detalles manuales</h3>
          <button className="w-full h-14 bg-[#2563eb] text-white rounded-xl font-medium shadow-md">
            Ver Detalles
          </button>
        </section>

      </main>

      {/* Bottom Navigation Bar (Con Añadir activado) */}
      <nav className="bg-white border-t border-slate-100 px-6 py-2 pb-safe flex justify-between items-center z-30 fixed bottom-0 w-full">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Pacientes</span>
        </button>
        
        <button className="flex flex-col items-center justify-center w-16 gap-1 group">
          <div className="bg-[#1775d3]/10 text-[#1775d3] w-12 h-8 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[24px] filled">qr_code_scanner</span>
          </div>
          <span className="text-[11px] font-medium text-[#1775d3] tracking-wide mt-1">Añadir</span>
        </button>
        
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Perfil</span>
        </button>
      </nav>
      
    </div>
  );
}