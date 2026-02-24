import { useNavigate } from 'react-router-dom';

export default function MedicationListPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col p-6 bg-bg-app overflow-y-auto no-scrollbar pb-24">
      <header className="pt-8 mb-8 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center active:scale-95"><span className="material-symbols-outlined text-3xl">arrow_back</span></button>
        <h1 className="text-4xl font-bold tracking-tight">Mis medicinas</h1>
      </header>
      <div className="space-y-6">
        {/* Tarjeta Naranja (Pendiente) */}
        <div className="bg-white rounded-[2rem] p-6 shadow-lg border-l-8 border-orange-500">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold">Paracetamol 1g</h2>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-bold">Pendiente</span>
          </div>
          <p className="text-xl text-slate-600 mb-1">Próxima: <strong>14:00</strong></p>
          <p className="text-lg text-orange-600 font-bold mb-4">En 45 min</p>
          <button onClick={() => navigate('/alarm')} className="w-full h-16 bg-primary text-white font-bold text-xl rounded-2xl shadow-md active:scale-95">Marcar como tomada</button>
        </div>
        
        {/* Tarjeta Verde (Tomada) */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 border-l-8 border-green-500 opacity-75">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold">Omeprazol 20mg</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold">Tomada</span>
          </div>
          <p className="text-xl text-slate-600">Siguiente: Mañana 08:00</p>
        </div>
      </div>
    </div>
  );
}