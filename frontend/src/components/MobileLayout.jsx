import React from 'react';

export const MobileLayout = ({ children }) => {
  return (
    <div className="bg-background-light text-text-main font-display min-h-screen flex flex-col items-center justify-center overflow-hidden antialiased">
      <main className="w-full max-w-md h-screen max-h-[900px] relative flex flex-col bg-background-light shadow-none md:shadow-2xl md:h-[850px] md:rounded-[3rem] md:border-8 md:border-gray-900 overflow-hidden">
        
        {/* Mancha decorativa de Stich */}
        <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[50%] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        
        {/* Contenido de la página */}
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};