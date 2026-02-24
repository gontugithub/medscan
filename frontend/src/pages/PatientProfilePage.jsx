import { useNavigate } from 'react-router-dom';

export default function PatientProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24">
      <header className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full active:scale-95">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
      </header>
      <div className="flex flex-col items-center px-6">
        <img src="https://i.pravatar.cc/150?img=32" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4" alt="Paca" />
        <h2 className="text-3xl font-bold text-text-main mb-1">Paca López</h2>
        <span className="text-lg text-slate-500 bg-slate-100 px-4 py-1 rounded-full font-medium">78 años</span>
      </div>
      <div className="p-6 mt-4">
        <h3 className="text-2xl font-bold mb-4">Medicamentos</h3>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary text-3xl">pill</span></div>
          <div><h4 className="text-xl font-bold">Paracetamol 1g</h4><p className="text-slate-500">Cada 8 horas</p></div>
        </div>
        <button onClick={() => navigate('/add-medication')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg mt-4 active:scale-95">
          Añadir nuevo medicamento
        </button>
      </div>
    </div>
  );
}