import { useNavigate } from 'react-router-dom';

export default function AddMedicationPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar pb-10">
      <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-6 active:scale-95">
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
      <h2 className="text-3xl font-bold mb-6 text-text-main">Añadir Medicamento</h2>
      
      <button onClick={() => navigate('/camera')} className="w-full h-20 bg-blue-50 border-2 border-primary border-dashed rounded-2xl flex items-center justify-center gap-4 text-primary active:scale-95 mb-8">
        <span className="material-symbols-outlined text-4xl">photo_camera</span>
        <span className="text-xl font-bold">Escanear envase ahora</span>
      </button>

      <div className="space-y-6">
        <div><label className="block text-lg font-medium mb-2">Nombre</label><input type="text" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 text-lg bg-white" placeholder="Ej. Ibuprofeno" /></div>
        <div><label className="block text-lg font-medium mb-2">Código Nacional (CNM)</label><input type="number" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 text-lg bg-white" placeholder="Ej. 665544" /></div>
        <div>
          <label className="block text-lg font-medium mb-2">Frecuencia</label>
          <div className="flex gap-2">
            <button className="flex-1 h-14 bg-primary text-white rounded-xl font-bold">Diaria</button>
            <button className="flex-1 h-14 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-500">Puntual</button>
          </div>
        </div>
        <button onClick={() => navigate('/profile')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg mt-8 active:scale-95">
          Guardar
        </button>
      </div>
    </div>
  );
}