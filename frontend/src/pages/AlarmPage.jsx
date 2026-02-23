import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlarmPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6f8f6] min-h-screen flex flex-col items-center justify-between p-6 font-display">
      {/* Estado de la Alarma */}
      <div className="w-full flex justify-center pt-8 animate-pulse">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-[#F44336]">
          <span className="material-symbols-outlined text-2xl">notifications_active</span>
          <span className="text-sm font-bold uppercase tracking-wider">Alarma de medicación</span>
        </div>
      </div>

      {/* Contenido Central */}
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-8 my-4">
        <div className="relative w-full aspect-[4/3] max-h-[40vh] bg-white rounded-xl shadow-xl overflow-hidden border-4 border-white">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7AYX6tTeIwZsvNh0qTfOrCfroj-7Tq61jBmbi2ykwswbzT7Jd5aCtIALXu5qJKxRMtbiCTfDaejQzmlM7qQr1DHL9PHw9bC4Vjm95btohPMljo2KEuaRnWKx4QNai9gLT-qvxU-JU1OBdc1zLe0G1uXEPfeVPTGk36TyukSvOEWBf8uIa8m-OVrZcZG29Mx0IZyCLAaXGP9ATC-EZptczrFlebxMgJX--iqM2fPSegmZT1XdOn0q9bHrStL0y6ELwm_3warOd70E" 
            className="w-full h-full object-cover" 
            alt="Paracetamol" 
          />
          <div className="absolute bottom-4 right-4 bg-[#41be47] text-white px-4 py-1.5 rounded-full font-bold text-lg shadow-lg">
            1 comprimido
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            ¡Paca, es hora de tomar <span className="text-[#41be47] block mt-1">Paracetamol 1g!</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Después de la comida</p>
        </div>
      </div>

      {/* Acciones Inferiores */}
      <div className="w-full flex flex-col gap-4 pb-8">
        <button 
          onClick={() => navigate('/home')} 
          className="w-full h-20 flex items-center justify-center gap-3 bg-[#41be47] hover:bg-[#369f3b] text-white rounded-full shadow-lg active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-white text-2xl font-bold">check</span>
          <span className="text-white text-xl md:text-2xl font-bold tracking-wide">Ya me la he tomado</span>
        </button>
        
        <button className="w-full h-16 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 active:scale-95 transition-all rounded-full border-2 border-[#F44336]/10 text-[#F44336]">
          <span className="material-symbols-outlined text-2xl">snooze</span>
          <span className="text-lg md:text-xl font-bold">Posponer 15 minutos</span>
        </button>
      </div>
    </div>
  );
};

export default AlarmPage;