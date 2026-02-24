import { useNavigate } from 'react-router-dom';

export default function AlarmPage() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-between p-8">
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="bg-red-50 text-danger px-6 py-2 rounded-full font-bold uppercase tracking-widest animate-pulse border border-red-200">
          Alarma de medicación
        </div>
        <h1 className="text-5xl font-black text-center text-text-main leading-tight">
          Es hora de tomar<br/><span className="text-primary">Paracetamol 1g</span>
        </h1>
        <div className="w-full aspect-square bg-slate-100 rounded-[2rem] mt-4 flex items-center justify-center border-4 border-slate-200 shadow-inner">
          <span className="material-symbols-outlined text-[120px] text-slate-300">medication</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 mb-8">
        <button onClick={() => navigate('/home')} className="w-full h-[80px] bg-success text-white text-2xl font-bold rounded-[2rem] shadow-[0_12px_24px_rgba(76,175,80,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl font-bold">check</span> Ya me la he tomado
        </button>
        <button onClick={() => navigate('/home')} className="w-full h-[70px] bg-white border-4 border-danger text-danger text-xl font-bold rounded-[2rem] flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl font-bold">snooze</span> Posponer 15 minutos
        </button>
      </div>
    </div>
  );
}