import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full bg-background-light dark:bg-background-dark">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex flex-col">
          <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">Buenos días,</span>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">Hola, Paca</h1>
        </div>
        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
          <span className="material-symbols-outlined text-2xl text-slate-700 dark:text-slate-200">settings</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-6 px-6 py-4">
        {/* Botón Gigante de Escaneo */}
        <button 
          onClick={() => navigate('/camera')}
          className="relative flex flex-col items-center justify-center w-full min-h-[200px] bg-primary hover:bg-blue-700 text-white rounded-2xl shadow-lg active:scale-[0.98] transition-all"
        >
          <div className="flex flex-col items-center gap-4 p-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '48px' }}>photo_camera</span>
            </div>
            <span className="text-2xl font-bold leading-tight">Escanear<br/>medicamento</span>
          </div>
        </button>

        {/* Botón Secundario */}
        <button className="flex flex-col items-center justify-center w-full min-h-[160px] bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl shadow-sm active:scale-[0.98] transition-all">
          <div className="flex flex-col items-center gap-3 p-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-slate-600 dark:text-slate-300">pill</span>
            </div>
            <span className="text-xl font-bold">Mis medicamentos</span>
          </div>
        </button>

        {/* Resumen */}
        <div className="w-full bg-primary/10 rounded-xl p-5 flex items-start gap-4">
          <span className="material-symbols-outlined text-primary text-3xl mt-1">calendar_month</span>
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Hoy</h3>
            <p className="text-slate-600 dark:text-slate-300 text-base">Tienes 2 tomas pendientes esta tarde.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientHomePage;