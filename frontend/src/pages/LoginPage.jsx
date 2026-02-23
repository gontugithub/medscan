import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de auth. Simulamos ir al dashboard de paciente:
    navigate('/home');
  };

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-slate-800 relative">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          aria-label="Go back" 
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
      </div>

      <div className="flex flex-col w-full h-full pt-8 px-6 pb-8 overflow-y-auto">
        <div className="flex flex-col items-center justify-center pt-8 pb-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-5xl">medical_services</span>
          </div>
          <span className="text-primary font-bold text-xl tracking-wide">MedScan</span>
        </div>

        <h1 className="text-slate-900 dark:text-white text-[32px] font-bold leading-tight text-center mb-8">
          Bienvenido de nuevo
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <label className="flex flex-col gap-2">
            <span className="text-slate-700 dark:text-slate-300 text-lg font-medium ml-1">Email o nombre de usuario</span>
            <div className="relative">
              <input 
                type="text" 
                placeholder="ejemplo@correo.com" 
                className="w-full h-14 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-0 text-slate-900 dark:text-white text-lg placeholder:text-slate-400 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined">person</span>
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-slate-700 dark:text-slate-300 text-lg font-medium ml-1">Contraseña</span>
            <div className="relative flex items-center">
              <input 
                type="password" 
                placeholder="******" 
                className="w-full h-14 px-4 pr-12 rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-0 text-slate-900 dark:text-white text-lg placeholder:text-slate-400 transition-colors"
              />
              <button type="button" className="absolute right-0 top-0 h-full w-14 flex items-center justify-center text-primary focus:outline-none">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </label>

          <div className="flex justify-end">
            <a href="#" className="text-primary text-base font-medium py-2 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="w-full h-14 bg-primary hover:bg-blue-700 text-white font-bold text-xl rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2">
            Entrar
          </button>

          <div className="text-center mt-4">
            <button type="button" onClick={() => navigate('/register')} className="text-slate-600 dark:text-slate-400 text-lg hover:text-slate-900 dark:hover:text-white transition-colors">
              ¿No tienes cuenta? <span className="text-primary font-bold">Regístrate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 