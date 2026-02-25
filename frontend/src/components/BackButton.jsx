import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ 
  to = '/home', 
  label = 'Volver al inicio', 
  onClick 
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (onClick) {
      onClick();
    } else if (to === -1) {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  return (
    <button 
      onClick={handleNavigation} 
      className="flex items-center gap-1.5 text-[#1775d3] font-bold text-sm bg-[#1775d3]/10 w-fit px-3 py-2 rounded-lg active:scale-95 transition-transform"
    >
      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      {label}
    </button>
  );
}