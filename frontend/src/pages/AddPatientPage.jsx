import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MedScanLogo from '../components/MedScan_Logo.jsx';

export default function AddPatientPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('medscan_patients');
    return saved ? JSON.parse(saved) : []; 
  });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: 'P-', nombre: '', apellidos: '', fechaNacimiento: '', foto: null, medicamentos: [] });
  const fotoRef = useRef();

  useEffect(() => {
    localStorage.setItem('medscan_patients', JSON.stringify(patients));
  }, [patients]);

  const calcularEdad = (f) => f ? new Date().getFullYear() - new Date(f).getFullYear() + " años" : '—';

  const obtenerEstadoVisual = (medicamentos = []) => {
    if (medicamentos.length === 0) return { clase: "bg-slate-100 text-slate-400", icono: "block", hora: "" };
    const ahora = new Date();
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();
    const todas = medicamentos.flatMap(m => (m.horas || []).map(h => ({
      horaStr: h, minutos: parseInt(h.split(':')[0]) * 60 + parseInt(h.split(':')[1]),
      tomada: m.tomasRealizadas?.includes(h)
    })));

    const atrasadas = todas.filter(t => t.minutos < horaActual && !t.tomada);
    if (atrasadas.length > 0) return { clase: "bg-red-500 text-white shadow-lg", icono: "error", hora: atrasadas[0].horaStr };
    if (!todas.some(t => t.tomada)) return { clase: "bg-amber-400 text-white shadow-lg", icono: "warning", hora: "" };
    return { clase: "bg-green-500 text-white shadow-lg", icono: "check_circle", hora: "" };
  };

  const filtered = patients.filter(p => 
    `${p.nombre} ${p.apellidos} ${p.id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans pb-40 text-slate-900 relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <MedScanLogo className="w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Med<span className="text-[#1775d3]">Scan</span></h1>
        </div>
        <div className="relative">
          {patients.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#1775d3] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg z-10 animate-bounce">{patients.length}</div>
          )}
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white h-10 w-10 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
            <span className="material-symbols-outlined">{showForm ? 'close' : 'person_add'}</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* BUSCADOR */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre, apellido o ID..." className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white shadow-md outline-none font-bold text-slate-600 border-none" />
        </div>

        {/* FORMULARIO AÑADIR */}
        {showForm && (
          <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-blue-50 space-y-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col items-center gap-2">
              <div onClick={() => fotoRef.current.click()} className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer">
                {form.foto ? <img src={form.foto} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-slate-300 text-3xl">add_a_photo</span>}
              </div>
              <input type="file" ref={fotoRef} hidden onChange={e => {
                const r = new FileReader(); r.onload = (ev) => setForm({...form, foto: ev.target.result}); r.readAsDataURL(e.target.files[0]);
              }} />
            </div>
            <input value={form.id} onChange={e => setForm({...form, id: e.target.value.toUpperCase()})} placeholder="ID (P-000)" className="w-full h-12 px-4 rounded-xl bg-slate-50 font-black text-blue-600 outline-none" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" className="h-12 px-4 rounded-xl bg-slate-50 font-bold outline-none border-none" />
              <input value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} placeholder="Apellidos" className="h-12 px-4 rounded-xl bg-slate-50 font-bold outline-none border-none" />
            </div>
            <input type="date" value={form.fechaNacimiento} onChange={e => setForm({...form, fechaNacimiento: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-slate-50 font-bold outline-none text-slate-400" />
            <button onClick={() => {setPatients([...patients, form]); setShowForm(false);}} className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black shadow-lg">GUARDAR PACIENTE</button>
          </div>
        )}

        {/* LISTADO */}
        <div className="space-y-3">
          {filtered.map(p => {
            const estado = obtenerEstadoVisual(p.medicamentos);
            return (
              <div key={p.id} onClick={() => navigate('/profile', { state: { paciente: p } })} className="bg-white rounded-[2.2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-50 active:scale-95 transition-all">
                <img src={p.foto || "https://via.placeholder.com/150"} className="w-14 h-14 rounded-2xl object-cover bg-slate-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-slate-800 text-base truncate">{p.nombre} {p.apellidos}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.id} • {calcularEdad(p.fechaNacimiento)}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 shadow-sm ${estado.clase}`}>
                  <span className="material-symbols-outlined text-lg">{estado.icono}</span>
                  {estado.hora && <span className="text-[9px] font-black">{estado.hora}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* BOTONES FLOTANTES LATERALES GRANDES */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-end gap-4 z-50 pointer-events-none">
        {/* AZUL: IA PACIENTE */}
        <button 
          onClick={() => navigate('/camera', { state: { mode: 'ask' } })}
          className="pointer-events-auto flex-1 h-24 bg-[#1775d3] text-white rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center active:scale-95 transition-all border-4 border-white"
        >
          <span className="material-symbols-outlined text-[32px]">psychology</span>
          <span className="text-[10px] font-black uppercase mt-1">IA Consultar</span>
        </button>

   
      </div>
    </div>
  );
}