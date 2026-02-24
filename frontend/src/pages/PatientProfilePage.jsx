import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-screen flex flex-col overflow-hidden w-full relative">
      
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center border-b border-slate-100 sticky top-0 z-20 pt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[#1f2937]">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold pr-10">Perfil del Paciente</h1>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8] pb-28 no-scrollbar">
        
        {/* Top Profile Info (Igual al diseño de Figma) */}
        <div className="flex flex-col items-center pt-8 pb-6 bg-white shadow-sm rounded-b-3xl mb-6">
          <div className="relative">
            <img src="https://i.pravatar.cc/150?img=32" alt="Paca López" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3" />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-[#1f2937]">Paca López</h2>
          <button className="text-[#1775d3] text-sm font-medium mt-1 flex items-center gap-1 active:opacity-70">
            Ver historial médico <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Sección de Medicamentos */}
        <div className="px-5 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-[#1f2937]">Medicamentos</h3>
            <button className="text-[#1775d3] text-sm font-medium">Ver todos</button>
          </div>

          {/* Card Medicamento 1 */}
          <article className="bg-white rounded-xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1775d3] shrink-0">
              <span className="material-symbols-outlined text-[24px]">medication</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#1f2937]">Paracetamol 1g</h4>
              <p className="text-sm text-slate-500">1 pastilla cada 8h</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
               <div className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                 <span className="material-symbols-outlined text-[12px]">check_circle</span>
                 09:15
               </div>
            </div>
          </article>

          {/* Card Medicamento 2 */}
          <article className="bg-white rounded-xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <span className="material-symbols-outlined text-[24px]">pill</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#1f2937]">Omeprazol 20mg</h4>
              <p className="text-sm text-slate-500">1 cápsula en ayunas</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
               <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                 <span className="material-symbols-outlined text-[12px]">schedule</span>
                 Pendiente
               </div>
            </div>
          </article>

          {/* Card Medicamento 3 */}
          <article className="bg-white rounded-xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
              <span className="material-symbols-outlined text-[24px]">water_drop</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-[#1f2937]">Sintrom 4mg</h4>
              <p className="text-sm text-slate-500">Según pauta médica</p>
            </div>
             <div className="flex flex-col items-end shrink-0">
               <div className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                 <span className="material-symbols-outlined text-[12px]">calendar_month</span>
                 Mañana
               </div>
            </div>
          </article>

          {/* Botón Añadir Nuevo Medicamento */}
          <button 
            onClick={() => navigate('/add-medication')}
            className="w-full mt-4 bg-[#1775d3] hover:bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(23,117,211,0.3)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
            Añadir nuevo medicamento
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar (Fijada abajo con "Perfil" activado) */}
      <nav className="bg-white border-t border-slate-100 px-6 py-2 pb-safe flex justify-between items-center z-30 absolute bottom-0 w-full">
        {/* Pestaña Pacientes (Inactiva) */}
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Pacientes</span>
        </button>
        
        {/* Pestaña Añadir (Inactiva) */}
        <button onClick={() => navigate('/add-patient')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Añadir</span>
        </button>
        
        {/* Pestaña Perfil (Activa) */}
        <button className="flex flex-col items-center justify-center w-16 gap-1 group">
          <div className="bg-[#1775d3]/10 text-[#1775d3] w-12 h-8 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[24px] filled">account_circle</span>
          </div>
          <span className="text-[11px] font-medium text-[#1775d3] tracking-wide mt-1">Perfil</span>
        </button>
      </nav>

    </div>
  );
}