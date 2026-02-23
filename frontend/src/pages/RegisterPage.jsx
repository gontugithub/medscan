import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-slate-900 relative">
      <header className="px-6 pt-12 pb-2 shrink-0">
        <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">
          Crea tu cuenta
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center text-lg mt-2 font-medium">
          Regístrate para usar MedScan
        </p>
      </header>

      <main className="flex-1 w-full px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="text-slate-900 dark:text-white text-lg font-semibold ml-1">Nombre completo</label>
          <div className="relative flex items-center">
            <input id="nombre" type="text" placeholder="Ej. María" className="w-full rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-16 p-4 text-lg text-slate-900 dark:text-white" />
            <span className="material-symbols-outlined absolute right-4 text-slate-400 pointer-events-none">person</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-900 dark:text-white text-lg font-semibold ml-1">Correo electrónico</label>
          <div className="relative flex items-center">
            <input id="email" type="email" placeholder="ejemplo@correo.com" className="w-full rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-16 p-4 text-lg text-slate-900 dark:text-white" />
            <span className="material-symbols-outlined absolute right-4 text-slate-400 pointer-events-none">mail</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-slate-900 dark:text-white text-lg font-semibold ml-1">Contraseña</label>
          <div className="relative flex items-center">
            <input id="password" type="password" placeholder="Mínimo 8 caracteres" className="w-full rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:border-primary h-16 p-4 text-lg text-slate-900 dark:text-white" />
            <span className="material-symbols-outlined absolute right-4 text-slate-400 cursor-pointer">visibility</span>
          </div>
        </div>

        <div className="pt-4 pb-2">
          <button className="w-full bg-primary hover:bg-blue-700 text-white rounded-xl h-16 text-xl font-bold tracking-wide shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
            Registrarse
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
        </div>

        <div className="pb-8 pt-2 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            ¿Ya tienes cuenta? 
            <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline ml-1">Inicia sesión</button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;