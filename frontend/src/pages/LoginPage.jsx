import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-8 active:scale-95">
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
      <h2 className="text-3xl font-bold mb-8 text-text-main">Bienvenido de nuevo</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Email o nombre de usuario</label>
          <input type="text" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 focus:border-primary focus:ring-0 text-lg bg-white outline-none" placeholder="ejemplo@correo.com" />
        </div>
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Contraseña</label>
          <div className="relative">
            <input type="password" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 focus:border-primary focus:ring-0 text-lg bg-white outline-none" placeholder="******" />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">visibility</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-primary font-medium text-lg">¿Olvidaste tu contraseña?</span>
        </div>
        <button onClick={() => navigate('/role')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg mt-4 active:scale-95 transition-transform">
          Entrar
        </button>
        <p className="text-center text-lg text-slate-600 mt-6">
          ¿No tienes cuenta? <span onClick={() => navigate('/register')} className="text-primary font-bold cursor-pointer">Regístrate</span>
        </p>
      </div>
    </div>
  );
}