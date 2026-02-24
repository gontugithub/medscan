import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 mt-10">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-5xl font-bold">crop_free</span>
          <span className="material-symbols-outlined text-6xl filled -rotate-45">pill</span>
        </div>
        <h1 className="text-5xl font-black text-text-main tracking-tight">MedScan</h1>
        <p className="text-xl font-medium text-slate-600 max-w-[300px]">
          Escanea, entiende y nunca olvides tu medicación
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 pb-8">
        <button onClick={() => navigate('/login')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-[0_8px_24px_rgba(25,118,210,0.3)] active:scale-95 transition-transform">
          Iniciar sesión
        </button>
        <button onClick={() => navigate('/register')} className="w-full h-16 bg-transparent border-2 border-primary text-primary text-xl font-bold rounded-2xl active:bg-primary/5 transition-colors">
          Registrarse
        </button>
        <p className="text-center text-sm font-medium text-slate-400 mt-2 uppercase tracking-widest">Demo hackathon</p>
      </div>
    </div>
  );
}