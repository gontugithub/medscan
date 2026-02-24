import { useNavigate } from 'react-router-dom';

export default function AddPatientPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col p-6">
      <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-6 active:scale-95">
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
      <h2 className="text-3xl font-bold mb-8 text-text-main">Añadir paciente</h2>
      <div className="flex-1">
        <label className="block text-xl font-medium text-slate-700 mb-2">ID del paciente</label>
        <input type="text" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 text-xl bg-white outline-none mb-8" placeholder="Ej: 123-456" />
        <button onClick={() => navigate('/dashboard')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-transform">
          Asignar
        </button>
      </div>
    </div>
  );
}