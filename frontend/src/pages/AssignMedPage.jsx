import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AssignMedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { med, patients } = location.state || { med: {}, patients: [] };
  const [selectedId, setSelectedId] = useState('');
  const [frecuencia, setFrecuencia] = useState('');

  const handleSave = () => {
    if (!selectedId || !frecuencia) return;
    const updated = patients.map(p => {
      if (p.id === selectedId) {
        return {
          ...p,
          medicamentos: [...p.medicamentos, { 
            nombre: med.nombre, 
            cn: med.cn, 
            frecuencia: frecuencia, 
            foto_url: med.fotoUrl,
            tomado: false 
          }]
        };
      }
      return p;
    });
    localStorage.setItem('medscan_patients', JSON.stringify(updated));
    navigate('/home'); 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 flex flex-col font-display">
      <h2 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">¿Para quién es {med.nombre}?</h2>
      
      <div className="space-y-3 mb-8">
        {patients.map(p => (
          <button 
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${selectedId === p.id ? 'border-[#1775d3] bg-blue-50 shadow-md' : 'border-white bg-white'}`}
          >
            <img src={p.foto} className="w-12 h-12 rounded-xl object-cover" />
            <div className="text-left flex-1">
                <p className="font-black text-slate-800">{p.nombre}</p>
                <p className="text-[10px] font-bold text-slate-400">{p.id}</p>
            </div>
            {selectedId === p.id && <span className="material-symbols-outlined text-[#1775d3]">check_circle</span>}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 mb-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pauta recomendada</p>
          <input 
            placeholder="Ej: 1 cada 8 horas después de comer" 
            value={frecuencia}
            onChange={e => setFrecuencia(e.target.value)}
            className="w-full h-14 px-4 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none font-bold text-slate-700 focus:border-blue-400"
          />
      </div>

      <button onClick={handleSave} className="w-full h-16 bg-[#1775d3] text-white rounded-[1.5rem] font-black text-lg shadow-xl active:scale-95 transition-all">
        CONFIRMAR ASIGNACIÓN
      </button>
    </div>
  );
}