import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('patient');

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedRole === 'patient') {
      navigate('/home');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col antialiased">
      <header className="flex flex-col items-center justify-center pt-12 pb-4 px-6 w-full max-w-md mx-auto text-center">
        <div className="flex items-center gap-2 mb-4 text-primary justify-center">
          <span className="material-symbols-outlined text-4xl">medical_services</span>
          <span className="text-xl font-bold tracking-tight">CIMA Salud</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-2">Elige tu rol</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
          <span className="material-symbols-outlined text-lg text-orange-800">info</span>
          <p className="text-sm font-medium text-orange-800">No se puede cambiar más adelante</p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-6 flex flex-col gap-6">
        <div className="flex-1 grid grid-cols-1 gap-6">
          {/* Opción Paciente */}
          <label 
            onClick={() => setSelectedRole('patient')}
            className={`group relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedRole === 'patient' ? 'border-primary bg-blue-50' : 'border-slate-200 bg-white'}`}
          >
            <div className={`mb-6 p-4 rounded-full transition-colors ${selectedRole === 'patient' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
              <span className="material-symbols-outlined text-6xl" style={{ fontSize: '64px' }}>person</span>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${selectedRole === 'patient' ? 'text-primary' : ''}`}>Soy Paciente</h3>
            <p className="text-slate-500 text-center text-lg leading-snug">Gestiono mis propios medicamentos</p>
            {selectedRole === 'patient' && (
              <div className="absolute top-4 right-4 text-primary">
                <span className="material-symbols-outlined text-3xl filled">check_circle</span>
              </div>
            )}
          </label>

          {/* Opción Cuidador */}
          <label 
            onClick={() => setSelectedRole('caregiver')}
            className={`group relative flex flex-col items-center justify-center p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedRole === 'caregiver' ? 'border-primary bg-blue-50' : 'border-slate-200 bg-white'}`}
          >
            <div className={`mb-6 p-4 rounded-full transition-colors ${selectedRole === 'caregiver' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
              <span className="material-symbols-outlined text-6xl" style={{ fontSize: '64px' }}>volunteer_activism</span>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${selectedRole === 'caregiver' ? 'text-primary' : ''}`}>Soy Cuidador</h3>
            <p className="text-slate-500 text-center text-lg leading-snug">Ayudo a un familiar con su salud</p>
            {selectedRole === 'caregiver' && (
              <div className="absolute top-4 right-4 text-primary">
                <span className="material-symbols-outlined text-3xl filled">check_circle</span>
              </div>
            )}
          </label>
        </div>

        <div className="pt-4 pb-8">
          <button 
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white text-xl font-bold py-5 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            <span>Continuar</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoleSelectionPage;