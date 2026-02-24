import { useNavigate } from 'react-router-dom';

const medications = [
  {
    id: 1,
    nombre: 'Paracetamol 1g',
    estado: 'pendiente',
    proxima: '14:00',
    countdown: 'En 45 min',
    fotoUrl: 'https://cima.aemps.es/cima/fotos/full/materialas/70310/70310_materialas.jpg',
  },
  {
    id: 2,
    nombre: 'Omeprazol 20mg',
    estado: 'tomada',
    tomadaA: '08:00',
    fotoUrl: 'https://cima.aemps.es/cima/fotos/full/materialas/83628/83628_materialas.jpg',
  },
];

export default function MedicationListPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAFAFA] text-[#212121] font-display min-h-screen flex flex-col overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 rounded-xl shadow-sm active:scale-95 transition-all hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
            <span className="text-lg font-bold">Volver al menú</span>
          </button>
        </div>
        <div className="px-1 pb-1">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight mb-1">
            Mis medicamentos
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Paciente: <span className="text-primary font-bold">Paca López</span>
          </p>
        </div>
      </header>

      {/* Lista */}
      <main className="flex-1 px-4 py-6 flex flex-col gap-6 pb-32">

        {/* ── TARJETA PENDIENTE ── */}
        <article className="relative overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 active:scale-[0.98] transition-transform">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500 z-10" />

          <div className="flex flex-col">
            {/* Foto */}
            <div className="relative w-full h-52 bg-slate-200 overflow-hidden flex items-center justify-center">
              {medications[0].fotoUrl && !medications[0].fotoUrl.startsWith('PEGA') ? (
                <img
                  src={medications[0].fotoUrl}
                  alt={medications[0].nombre}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span className="material-symbols-outlined text-slate-300 text-6xl">medication</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="flex-1 p-6 flex flex-col gap-5">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-bold bg-orange-50 text-orange-800 border border-orange-200 mb-3">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                  Pendiente
                </span>
                <h2 className="text-[28px] font-bold leading-tight">{medications[0].nombre}</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-primary text-3xl">alarm</span>
                  <span className="text-xl font-medium">
                    Próxima: <span className="font-bold text-[#212121] text-2xl">{medications[0].proxima}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <span className="material-symbols-outlined text-3xl">timer</span>
                  <span className="text-xl font-bold">{medications[0].countdown}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate('/alarm')}
                  className="w-full py-5 px-6 bg-primary text-white font-bold text-xl rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                  Marcar como tomada
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* ── TARJETA TOMADA ── */}
        <article className="relative overflow-hidden rounded-xl bg-white shadow-md shadow-slate-200/40 ring-1 ring-slate-100">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500 z-10" />

          <div className="flex flex-col">
            {/* Foto */}
            <div className="relative w-full h-44 bg-slate-200 overflow-hidden flex items-center justify-center">
              {medications[1].fotoUrl && !medications[1].fotoUrl.startsWith('PEGA') ? (
                <img
                  src={medications[1].fotoUrl}
                  alt={medications[1].nombre}
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span className="material-symbols-outlined text-slate-300 text-6xl">medication</span>
              )}
              <div className="absolute inset-0 bg-white/10" />
            </div>

            {/* Contenido */}
            <div className="flex-1 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold leading-tight">{medications[1].nombre}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-green-50 text-green-800 border border-green-200 shrink-0">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  Tomada
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="material-symbols-outlined text-[24px]">history</span>
                <span className="text-lg font-medium">
                  Tomada a las <span className="font-bold text-[#212121]">{medications[1].tomadaA}</span>
                </span>
              </div>
            </div>
          </div>
        </article>

      </main>

      {/* FAB Escáner */}
      <button
        onClick={() => navigate('/camera')}
        className="fixed right-6 bottom-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-blue-900/30 active:scale-90 transition-transform"
        aria-label="Escanear medicamento"
      >
        <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
      </button>

    </div>
  );
}