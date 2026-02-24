import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');

  const handleContinue = () => {
    navigate(role === 'patient' ? '/home' : '/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col p-6 items-center text-center">
      <h2 className="text-3xl font-bold mt-12 mb-2">Elige tu rol</h2>
      <p className="text-lg text-slate-500 mb-10 font-medium bg-slate-100 px-4 py-2 rounded-full">No se puede cambiar más adelante</p>
      
      <div className="w-full space-y-6 flex-1">
        <div onClick={() => setRole('patient')} className={`w-full p-8 rounded-2xl border-2 transition-all flex flex-col items-center ${role === 'patient' ? 'border-primary bg-blue-50' : 'border-slate-200 bg-white'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${role === 'patient' ? 'bg-primary text-white' : 'bg-slate-100 text-primary'}`}>
            <span className="material-symbols-outlined text-5xl">person</span>
          </div>
          <h3 className="text-2xl font-bold">Soy Paciente</h3>
        </div>

        <div onClick={() => setRole('caregiver')} className={`w-full p-8 rounded-2xl border-2 transition-all flex flex-col items-center ${role === 'caregiver' ? 'border-primary bg-blue-50' : 'border-slate-200 bg-white'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${role === 'caregiver' ? 'bg-primary text-white' : 'bg-slate-100 text-primary'}`}>
            <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
          </div>
          <h3 className="text-2xl font-bold">Soy Cuidador</h3>
        </div>
      </div>

      <button onClick={handleContinue} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg mt-6 active:scale-95">
        Continuar
      </button>
    </div>
  );
}