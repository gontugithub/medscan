import { useNavigate } from 'react-router-dom';

export default function CameraPage() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col">
      <div className="p-6 flex justify-between items-center text-white mt-8">
        <h2 className="text-2xl font-bold">Escanear</h2>
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined text-4xl">close</span></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        {/* Placeholder para la cámara */}
        <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
        <div className="w-[80%] aspect-square border-4 border-primary rounded-3xl z-10 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] relative">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-primary shadow-[0_0_15px_#1976D2]"></div>
        </div>
      </div>
      <div className="h-48 pb-10 flex flex-col items-center justify-center gap-6 z-10">
        <p className="text-white text-xl font-bold">Enfoca el código o nombre</p>
        <button onClick={() => navigate('/processing')} className="w-24 h-24 bg-white rounded-full border-8 border-slate-300 active:scale-90 transition-transform"></button>
      </div>
    </div>
  );
}