import React from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationListPage = () => {
  const navigate = useNavigate();

  // Datos basados en tu diseño de Figma
  const medicamentos = [
    {
      id: 1,
      nombre: "Paracetamol 1g",
      estado: "Pendiente",
      proxima: "14:00",
      tiempo: "En 45 min",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHGb-HbPS-ahL853xye2nU39uEd13Avw1PJSl1JhUz4gLabpcBsWIcf8AU-CHWTBsrxFTV3Wu_3Rc9Q69aAavhxUICjty5ZKccJBwvEZUzzFwIfyA50MYS-od2lzMocUTAG4qGS3pS7L7I5EPQEqg6ycNLoq7ByFJgIwFgGJn5cjoG8jebwxe-LiMN-NIJIHV58nHb5-kejWUzsYDnOjbwn-6pa87u1pgqT2zxnMzF_oFBf9NtTThGXqT_wAY8SFxJAkNHa2sAvpE",
      color: "border-orange-500",
      tag: "bg-orange-50 text-orange-800"
    },
    {
      id: 2,
      nombre: "Omeprazol 20mg",
      estado: "Tomada",
      proxima: "08:00",
      tiempo: null,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEkQ6zA1tmRWvtpvKI09jfJ5ad5m6CNXW709XHNQBn_bFg3hycmBgHTsE_9YuVj1FO8RyafGR_TjM_gc7d_XYLDEgLRR3tRUnSdxnZQpvXTl5GI8xLCd4BOWBc2LR-v7RP4AcVo7lK1CiWR6W035XaMu-LNGnyOyVMq86eJrblG5dwnQEjq1JO9A-qhGoGoBfZgX4J_vGuYeG_RwYf5wRbjdTa6vTlIZvxOnsii-gf9n1g9boZ9c4R1-DmL82JYgb4MD15ByFEBVQ",
      color: "border-green-500",
      tag: "bg-green-50 text-green-800"
    }
  ];

  return (
    <div className="bg-background-light text-text-main font-display min-h-screen flex flex-col antialiased">
      {/* Header - Basado en tu HTML original */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200 px-4 pt-12 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="flex-1 max-w-fit flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-300 rounded-xl shadow-sm active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
            <span>Volver al menú</span>
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYq-0scAU4dHYzWtFESRWJeSXPu99iWZEu8uSKpHPlAKP4rYXK24AeBAjiAo0nunskaR3opVsFF8dI8X8DrVgA5X6lcH1We358eR8FW9y_4ZbpP8zfkQXFK1D3Or3YnjQUtUxk9bOvMZ5hai1mR7qmT01R3aRru1guCvrmGjRS6b6f_Ub4SMJXxmsM7DQ5ocJT2m499x9wNuzPWH5Zo7_l4Z819BjhgW2Fb8cxE6NqpMHbGXV42xrdkMNXzvM-bwAYgIhpEXzdGa4" className="w-full h-full object-cover" alt="perfil" />
          </div>
        </div>
        <div className="px-1 pb-2 text-left">
          <h1 className="text-3xl font-bold tracking-tight">Mis medicamentos</h1>
          <p className="text-slate-600 text-lg font-medium">Paciente: <span className="text-primary font-bold">Paca López</span></p>
        </div>
      </header>

      {/* Lista de tarjetas */}
      <main className="flex-1 px-4 py-6 flex flex-col gap-6 no-scrollbar pb-32 overflow-y-auto">
        {medicamentos.map(med => (
          <article key={med.id} className={`group relative overflow-hidden rounded-xl bg-white shadow-lg border-l-8 ${med.color} ring-1 ring-slate-100 active:scale-[0.98] transition-all`}>
            <div className="flex flex-col">
              <div className="h-40 bg-slate-100 relative">
                <img src={med.img} className="w-full h-full object-cover" alt={med.nombre} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border border-current/20 ${med.tag}`}>
                    <span className="material-symbols-outlined text-[20px] filled">
                      {med.estado === 'Pendiente' ? 'schedule' : 'check'}
                    </span>
                    {med.estado}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight">{med.nombre}</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <span className="material-symbols-outlined text-primary text-3xl">alarm</span>
                    <span className="text-xl font-medium">
                      {med.estado === 'Pendiente' ? 'Próxima:' : 'Tomada a las:'} <span className="font-bold text-2xl">{med.proxima}</span>
                    </span>
                  </div>
                  {med.tiempo && (
                    <div className="flex items-center gap-3 text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
                      <span className="material-symbols-outlined text-3xl">timer</span>
                      <span className="text-xl font-bold">{med.tiempo}</span>
                    </div>
                  )}
                </div>
                {med.estado === 'Pendiente' && (
                  <button 
                    onClick={() => navigate('/alarm')}
                    className="w-full py-5 bg-primary text-white font-bold text-xl rounded-xl shadow-lg mt-2 active:scale-95 transition-all"
                  >
                    Marcar como tomada
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Botón Flotante para Escanear */}
      <button 
        onClick={() => navigate('/camera')}
        className="fixed right-6 bottom-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl active:scale-90 transition-all"
      >
        <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
      </button>
    </div>
  );
};

export default MedicationListPage;