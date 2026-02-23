import React from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-display antialiased">
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200 px-4 pt-12 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="flex-1 max-w-fit flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-300 rounded-xl shadow-sm active:scale-95 transition-all text-[#212121]"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
            <span className="text-lg font-bold">Volver al menú</span>
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <img alt="Perfil" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYq-0scAU4dHYzWtFESRWJeSXPu99iWZEu8uSKpHPlAKP4rYXK24AeBAjiAo0nunskaR3opVsFF8dI8X8DrVgA5X6lcH1We358eR8FW9y_4ZbpP8zfkQXFK1D3Or3YnjQUtUxk9bOvMZ5hai1mR7qmT01R3aRru1guCvrmGjRS6b6f_Ub4SMJXxmsM7DQ5ocJT2m499x9wNuzPWH5Zo7_l4Z819BjhgW2Fb8cxE6NqpMHbGXV42xrdkMNXzvM-bwAYgIhpEXzdGa4"/>
          </div>
        </div>
        <div className="px-1 pb-2">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#212121] mb-1">Mis medicamentos</h1>
          <p className="text-slate-600 text-lg font-medium italic">Paciente: <span className="text-primary font-bold">Paca López</span></p>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Card: Paracetamol */}
        <article className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-100 flex flex-col active:scale-[0.98] transition-all border-l-8 border-orange-500">
          <div className="h-48 bg-slate-100 relative">
            <img alt="Med" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGb-HbPS-ahL853xye2nU39uEd13Avw1PJSl1JhUz4gLabpcBsWIcf8AU-CHWTBsrxFTV3Wu_3Rc9Q69aAavhxUICjty5ZKccJBwvEZUzzFwIfyA50MYS-od2lzMocUTAG4qGS3pS7L7I5EPQEqg6ycNLoq7ByFJgIwFgGJn5cjoG8jebwxe-LiMN-NIJIHV58nHb5-kejWUzsYDnOjbwn-6pa87u1pgqT2zxnMzF_oFBf9NtTThGXqT_wAY8SFxJAkNHa2sAvpE"/>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="bg-orange-50 text-orange-800 border border-orange-200 px-4 py-1.5 rounded-full text-base font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] filled">schedule</span> Pendiente
              </span>
            </div>
            <h2 className="text-[28px] font-bold text-[#212121]">Paracetamol 1g</h2>
            <div className="flex items-center gap-3 text-slate-700">
              <span className="material-symbols-outlined text-primary text-3xl">alarm</span>
              <span className="text-xl font-medium">Próxima: <span className="font-bold text-2xl text-[#212121]">14:00</span></span>
            </div>
            <button onClick={() => navigate('/alarm')} className="w-full py-5 bg-primary text-white font-bold text-xl rounded-xl shadow-lg mt-2">
              Marcar como tomada
            </button>
          </div>
        </article>
      </main>

      <button onClick={() => navigate('/camera')} className="fixed right-6 bottom-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl active:scale-90 transition-all">
        <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
      </button>
    </div>
  );
};

export default MedicationListPage;