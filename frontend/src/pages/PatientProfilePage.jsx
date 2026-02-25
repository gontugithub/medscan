import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MedScanLogo from '../components/MedScan_Logo.jsx';
import { api } from '../services/api';

export default function PatientProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paciente, setPaciente] = useState(location.state?.paciente || null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchMed, setSearchMed] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const [newMed, setNewMed] = useState({ 
    cn: '', nombre: '', dosis: '1 comp.', horas: ['08:00'], intervalo: 8, foto_url: '' 
  });

  const editFotoRef = useRef();

  useEffect(() => {
    if (!paciente) {
      const saved = JSON.parse(localStorage.getItem('medscan_patients') || '[]');
      if (saved.length > 0) setPaciente(saved[0]);
      else navigate('/add-patient'); 
    }
  }, [paciente, navigate]);

  const sugerirHoras = (primeraHora, intervalo) => {
    const horasArr = [];
    let [h, m] = primeraHora.split(':').map(Number);
    for (let i = 0; i < Math.floor(24 / intervalo); i++) {
      const hCalc = (h + (i * intervalo)) % 24;
      horasArr.push(`${hCalc.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
    return horasArr.sort();
  };

  const handleCnSearch = async (val) => {
    setNewMed({ ...newMed, cn: val });
    if (val.length === 6) {
      try {
        const data = await api.getMedicamentoInfo(val);
        if (data) setNewMed(prev => ({ 
            ...prev, 
            nombre: data.nombre || data.nombre_medicamento, 
            foto_url: data.foto_url 
        }));
      } catch (e) { console.error("Error API"); }
    }
  };

  const saveToGlobal = (p) => {
    const all = JSON.parse(localStorage.getItem('medscan_patients') || '[]');
    localStorage.setItem('medscan_patients', JSON.stringify(all.map(x => x.id === p.id ? p : x)));
  };

  const deleteThisPatient = () => {
    const all = JSON.parse(localStorage.getItem('medscan_patients') || '[]');
    const updated = all.filter(p => p.id !== paciente.id);
    localStorage.setItem('medscan_patients', JSON.stringify(updated));
    navigate('/add-patient'); 
  };

  if (!paciente) return null;

  const todasLasTomas = (paciente.medicamentos || [])
    .flatMap((m, mIdx) => (m.horas || []).map((h, hIdx) => ({...m, h, mIdx, hIdx})))
    .sort((a,b) => a.h.localeCompare(b.h))
    .filter(t => t.nombre?.toLowerCase().includes(searchMed.toLowerCase()));

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-40 font-sans">
      <header className="bg-white/90 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50 border-b">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-400">arrow_back_ios</button>
        <span className="font-bold uppercase text-[11px] tracking-widest text-slate-400">Expediente</span>
        <button 
          onClick={() => { if(isEditing) saveToGlobal(paciente); setIsEditing(!isEditing); }} 
          className={`px-5 py-2 rounded-2xl text-[10px] font-black tracking-widest transition-all ${isEditing ? 'bg-green-500 text-white shadow-lg' : 'bg-blue-50 text-blue-600'}`}
        >
          {isEditing ? 'GUARDAR' : 'EDITAR'}
        </button>
      </header>

      <main className="p-6">
        {/* INFO DEL PACIENTE */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className={`w-24 h-24 rounded-[2.5rem] overflow-hidden bg-white shadow-xl relative border-4 border-white`}>
              <img src={paciente.foto || "https://via.placeholder.com/150"} className="w-full h-full object-cover" />
              {/* EDITAR FOTO: Solo visible en modo edición */}
              {isEditing && (
                <div 
                  onClick={() => editFotoRef.current.click()} 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-3xl font-bold">photo_camera</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={editFotoRef} 
              hidden 
              onChange={(e) => {
                 const reader = new FileReader();
                 reader.onload = (ev) => setPaciente({...paciente, foto: ev.target.result});
                 if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
              }} 
            />
          </div>
          
          <div className="text-center w-full max-w-xs">
            {isEditing ? (
              <div className="space-y-3 animate-in fade-in">
                <input 
                  value={paciente.nombre} 
                  onChange={e => setPaciente({...paciente, nombre: e.target.value})} 
                  className="w-full text-center font-bold text-xl border-b-2 border-blue-100 outline-none bg-transparent" 
                  placeholder="Nombre" 
                />
                <input 
                  value={paciente.apellidos} 
                  onChange={e => setPaciente({...paciente, apellidos: e.target.value})} 
                  className="w-full text-center font-bold text-sm text-slate-400 border-b outline-none bg-transparent" 
                  placeholder="Apellidos" 
                />
                {/* EDITAR CUMPLEAÑOS */}
                <div className="bg-slate-50 p-2 rounded-xl mt-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 text-center tracking-widest">Fecha de Nacimiento</p>
                  <input 
                    type="date" 
                    value={paciente.fechaNacimiento} 
                    onChange={e => setPaciente({...paciente, fechaNacimiento: e.target.value})} 
                    className="w-full text-center text-sm font-bold text-blue-600 bg-transparent outline-none" 
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{paciente.nombre} {paciente.apellidos}</h2>
                <p className="text-[10px] font-black text-slate-300 tracking-[0.2em] mt-1">{paciente.id}</p>
              </>
            )}
          </div>
        </div>

        {/* BUSCADOR (No se mueve) */}
        {!isEditing && (
          <div className="mb-8">
            <input value={searchMed} onChange={(e) => setSearchMed(e.target.value)} placeholder="¿Qué pastilla buscas?" className="w-full h-14 pl-6 pr-6 bg-white border border-slate-100 rounded-[1.5rem] shadow-md outline-none text-base font-medium" />
          </div>
        )}

        {/* NUEVA PAUTA (No se mueve) */}
        {isEditing && (
          <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl space-y-4 mb-8">
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Nueva Pauta</p>
            <input value={newMed.cn} onChange={e => handleCnSearch(e.target.value)} placeholder="C.N. (6 dígitos)" className="w-full h-12 bg-white/10 rounded-xl px-4 text-white font-bold outline-none" />
            <div className="grid grid-cols-4 gap-2">
              {[4, 6, 8, 12].map(n => (
                <button key={n} type="button" onClick={() => setNewMed({...newMed, intervalo: n, horas: sugerirHoras(newMed.horas[0], n)})} className={`h-11 rounded-xl text-[10px] font-black ${newMed.intervalo === n ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-400'}`}>{n}H</button>
              ))}
            </div>
            <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-black uppercase">1ª Toma</span>
              <input type="time" value={newMed.horas[0]} onChange={(e) => setNewMed({...newMed, horas: sugerirHoras(e.target.value, newMed.intervalo)})} className="bg-white rounded-lg px-3 py-1 font-bold outline-none" />
            </div>
            <button type="button" onClick={() => {
              if(!newMed.nombre) return alert("Medicamento no encontrado");
              setPaciente({...paciente, medicamentos: [...(paciente.medicamentos || []), {...newMed, tomasRealizadas: []}]});
              setNewMed({ cn: '', nombre: '', dosis: '1 comp.', horas: ['08:00'], intervalo: 8, foto_url: '' });
            }} className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black shadow-lg">AÑADIR AL TRATAMIENTO</button>
          </div>
        )}

        {/* LISTADO TOMAS (No se mueve) */}
        <div className="space-y-3 mb-12">
          {todasLasTomas.map((toma, i) => {
            const tomada = paciente.medicamentos[toma.mIdx]?.tomasRealizadas?.includes(toma.h);
            return (
              <div key={i} className={`bg-white rounded-3xl p-4 flex items-center gap-4 border-2 transition-all ${tomada ? 'border-green-100 bg-green-50/10' : 'border-slate-50 shadow-sm'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden ${tomada ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-200'}`}>
                  {toma.foto_url ? <img src={toma.foto_url} className="w-full h-full object-contain p-1" /> : <span className="material-symbols-outlined">{tomada ? 'check' : 'medication'}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${tomada ? 'text-green-600 bg-green-50' : 'text-blue-500 bg-blue-50'}`}>{toma.h}</span>
                  <p className="font-bold text-slate-800 text-sm leading-tight truncate mt-1">{toma.nombre}</p>
                </div>
                {!isEditing && (
                  <button onClick={() => {
                    const up = {...paciente};
                    if(!up.medicamentos[toma.mIdx].tomasRealizadas) up.medicamentos[toma.mIdx].tomasRealizadas = [];
                    const idx = up.medicamentos[toma.mIdx].tomasRealizadas.indexOf(toma.h);
                    if(idx > -1) up.medicamentos[toma.mIdx].tomasRealizadas.splice(idx, 1);
                    else up.medicamentos[toma.mIdx].tomasRealizadas.push(toma.h);
                    setPaciente(up); saveToGlobal(up);
                  }} className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all ${tomada ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-200'}`}>
                    <span className="material-symbols-outlined font-black text-lg">check</span>
                  </button>
                )}
                {isEditing && (
                  <button onClick={() => {
                    const copy = [...paciente.medicamentos];
                    copy[toma.mIdx].horas = copy[toma.mIdx].horas.filter(h => h !== toma.h);
                    if(copy[toma.mIdx].horas.length === 0) copy.splice(toma.mIdx, 1);
                    setPaciente({...paciente, medicamentos: copy});
                  }} className="text-red-300 w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">delete</span></button>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTÓN ELIMINAR (No se mueve) */}
        <div className="pt-10 border-t">
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-black text-xs tracking-widest uppercase">Eliminar Usuario</button>
          ) : (
            <div className="space-y-3 animate-in slide-in-from-bottom-2">
              <p className="text-center text-[11px] font-bold text-red-500 uppercase">¿Confirmar borrado de {paciente.nombre}?</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setConfirmDelete(false)} className="py-3 bg-slate-100 rounded-xl font-bold text-xs">NO</button>
                <button onClick={deleteThisPatient} className="py-3 bg-red-600 text-white rounded-xl font-bold text-xs shadow-lg">SÍ, BORRAR</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}