import { useNavigate } from 'react-router-dom';

export default function PatientNoCaregiverPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-8xl text-primary opacity-50">pill</span>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-text-main">No tienes cuidador asignado</h2>
      <p className="text-xl text-slate-500 mb-12">Contacta con tu familiar para que escanee tu código QR y puedan ayudarte.</p>
      <button onClick={() => navigate('/home')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95">
        Volver
      </button>
    </div>
  );
}