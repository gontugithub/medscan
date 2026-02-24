import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddMedicationPage() {
  const navigate = useNavigate();
  const [frecuencia, setFrecuencia] = useState('diaria');

  return (
    <div className="flex-1 flex flex-col bg-bg-app h-full">
      <header className="p-4 flex items-center bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl text-slate-700">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-text-main mr-12">Nuevo Registro</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        {/* Botón de Escáner Gigante */}
        <button 
          onClick={() => navigate('/camera')} 
          className="w-full h-24 bg-blue-50 border-2 border-primary border-dashed rounded-2xl flex items-center justify-center gap-4 text-primary active:scale-95 transition-transform mb-8"
        >
          <span className="material-symbols-outlined text-4xl">photo_camera</span>
          <span className="text-xl font-bold">Escanear caja (Autocompletar)</span>
        </button>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-slate-700 mb-2">Nombre del medicamento</label>
            <input type="text" className="w-full h-16 px-5 rounded-2xl border-2 border-slate-200 text-lg bg-white focus:border-primary outline-none transition-colors" placeholder="Ej. Ibuprofeno 600mg" />
          </div>

          <div>
            <label className="block text-lg font-bold text-slate-700 mb-2">Código Nacional (CNM)</label>
            <input type="number" className="w-full h-16 px-5 rounded-2xl border-2 border-slate-200 text-lg bg-white focus:border-primary outline-none transition-colors" placeholder="Ej. 665544" />
          </div>

          <div>
            <label className="block text-lg font-bold text-slate-700 mb-2">Frecuencia</label>
            <div className="flex gap-3">
              {/* Botones interactivos con useState */}
              <button 
                onClick={() => setFrecuencia('diaria')}
                className={`flex-1 h-16 rounded-2xl font-bold text-lg border-2 transition-all ${frecuencia === 'diaria' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Diaria
              </button>
              <button 
                onClick={() => setFrecuencia('puntual')}
                className={`flex-1 h-16 rounded-2xl font-bold text-lg border-2 transition-all ${frecuencia === 'puntual' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Puntual
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="p-6 bg-white border-t border-slate-100 absolute bottom-0 left-0 right-0">
        <button 
          onClick={() => navigate('/profile')} 
          className="w-full h-[70px] bg-primary text-white text-xl font-bold rounded-2xl shadow-[0_8px_24px_rgba(25,118,210,0.3)] active:scale-95 transition-transform"
        >
          Guardar Medicamento
        </button>
      </div>
    </div>
  );
}