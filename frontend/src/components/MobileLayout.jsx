import React from 'react';

export const MobileLayout = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col items-center justify-center overflow-hidden antialiased">
      <main className="w-full max-w-md h-screen max-h-[900px] relative flex flex-col justify-between bg-white dark:bg-slate-900 shadow-none md:shadow-2xl md:h-[850px] md:rounded-[3rem] md:border-8 md:border-gray-900 overflow-hidden">
        {/* Barra de estado simulada (solo visible en PC para dar el pego de móvil) */}
        <div className="hidden md:flex w-full justify-between items-center px-6 pt-4 absolute top-0 left-0 right-0 z-50 pointer-events-none opacity-50">
          <span className="text-sm font-medium">9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[18px]">wifi</span>
            <span className="material-symbols-outlined text-[18px]">battery_full</span>
          </div>
        </div>
        
        {/* Aquí es donde se inyectan tus páginas (Landing, Login, etc.) */}
        {children}
      </main>
    </div>
  );
};