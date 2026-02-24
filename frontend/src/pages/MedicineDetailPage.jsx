import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function MedicineDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Datos que vienen desde MedicationListPage
  const cn = state?.cn;
  const nombre = state?.nombre || 'Medicamento';
  const fotoUrl = state?.fotoUrl || null;

const goToChat = () => {
  navigate('/processing', {
    state: {
      cn: cn,               
      nombreMedicamento: nombre,
      fotoUrl: fotoUrl,
    },
  });
};

  return (
    <div className="bg-[#FAFAFA] text-[#212121] font-display min-h-screen flex flex-col">

      {/* Header */}
      <header className="px-4 pt-10 pb-4 bg-white border-b border-slate-100">
        <BackButton to={-1} label="Volver" />
      </header>

      {/* Foto grande */}
      <div className="relative w-full h-72 bg-slate-200 overflow-hidden flex items-center justify-center">
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt={nombre}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <span className="material-symbols-outlined text-slate-300 text-8xl">medication</span>
        )}
        {/* Gradiente inferior para que el nombre encaje bien */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h1 className="absolute bottom-5 left-6 right-6 text-white text-3xl font-black leading-tight drop-shadow-lg">
          {nombre}
        </h1>
      </div>

      {/* Info básica */}
      <div className="px-6 py-5 bg-white border-b border-slate-100">
        <p className="text-slate-500 text-base font-medium">
          Código Nacional: <span className="text-[#212121] font-bold">{cn || '—'}</span>
        </p>
      </div>

      {/* Acciones */}
      <div className="flex-1 px-6 py-8 flex flex-col gap-4">

        {/* Botón 1: Ir al chat */}
        <button
          onClick={goToChat}
          className="w-full py-5 px-6 bg-primary text-white font-bold text-xl rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
          Preguntar a MedScan IA
        </button>

        {/* Botón 2: Próximamente */}
        <button
          disabled
          className="w-full py-5 px-6 bg-slate-100 text-slate-400 font-bold text-xl rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed border-2 border-dashed border-slate-200"
        >
          <span className="material-symbols-outlined text-3xl">lock_clock</span>
          Próximamente
        </button>

      </div>
    </div>
  );
}