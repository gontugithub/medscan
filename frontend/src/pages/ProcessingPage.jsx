import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProcessingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simula el proceso y redirige al chat automáticamente
    const timer = setTimeout(() => navigate('/chat'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg-app p-6">
      <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-8 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin"></div>
        <span className="material-symbols-outlined text-primary text-5xl">document_scanner</span>
      </div>
      <h2 className="text-4xl font-bold text-text-main mb-2">Analizando...</h2>
      <p className="text-xl text-slate-500 text-center">Consultando base de datos CIMA</p>
    </div>
  );
}