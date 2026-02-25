import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButtonn({ 
  label = 'Volver a pacientes' 
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Forzamos la navegación al inicio de la lista de pacientes (Dashboard médico)
    navigate('/add-patient');
  };

  return (
    <button 
      onClick={handleNavigation} 
      className="flex items-center gap-1.5 text-[#1775d3] font-bold text-sm bg-[#1775d3]/10 w-fit px-3 py-2 rounded-lg active:scale-95 transition-transform shadow-sm"
    >
      <span className="material-symbols-outlined text-[20px]">group</span>
      {label}
    </button>
  );
}