import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_MEDS = [
  { id: 1, nombre: 'Paracetamol 1g', dosis: '1 pastilla cada 8h', estado: 'tomado', hora: '09:15', icono: 'medication', color: 'blue' },
  { id: 2, nombre: 'Omeprazol 20mg', dosis: '1 cápsula en ayunas', estado: 'pendiente', hora: null, icono: 'pill', color: 'purple' },
  { id: 3, nombre: 'Sintrom 4mg', dosis: 'Según pauta médica', estado: 'manana', hora: null, icono: 'water_drop', color: 'orange' },
];

const COLOR_MAP = {
  blue:   { bg: 'bg-blue-50',   text: 'text-[#1775d3]' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
  green:  { bg: 'bg-green-50',  text: 'text-green-600' },
  rose:   { bg: 'bg-rose-50',   text: 'text-rose-600' },
};
const ICON_COLORS = ['blue', 'purple', 'orange', 'green', 'rose'];

const HORAS_RAPIDAS = ['06:00', '08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '20:00', '22:00'];

export default function PatientProfilePage() {
  const navigate = useNavigate();
  const [meds, setMeds] = useState(INITIAL_MEDS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: '', dosis: '' });
  // Estado inicial del nuevo med: 'pendiente' | 'tomado' | 'manana'
  const [nuevoEstado, setNuevoEstado] = useState('pendiente');
  const [horaCustom, setHoraCustom] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [error, setError] = useState('');

  const resetModal = () => {
    setForm({ nombre: '', dosis: '' });
    setNuevoEstado('pendiente');
    setHoraCustom('');
    setHoraSeleccionada('');
    setError('');
    setShowModal(false);
  };

  const handleAdd = () => {
    if (!form.nombre.trim() || !form.dosis.trim()) {
      setError('Rellena nombre y dosis.');
      return;
    }
    const color = ICON_COLORS[meds.length % ICON_COLORS.length];
    // Determinar hora final si está tomado
    let hora = null;
    if (nuevoEstado === 'tomado') {
      if (horaCustom) {
        hora = horaCustom;
      } else if (horaSeleccionada) {
        hora = horaSeleccionada;
      } else {
        // hora actual
        const now = new Date();
        hora = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      }
    }
    setMeds(prev => [
      ...prev,
      {
        id: Date.now(),
        nombre: form.nombre.trim(),
        dosis: form.dosis.trim(),
        estado: nuevoEstado,
        hora,
        icono: 'medication',
        color,
      },
    ]);
    resetModal();
  };

  const handleRemove = (id) => setMeds(prev => prev.filter(m => m.id !== id));

  const toggleTomado = (id) => {
    setMeds(prev => prev.map(m => {
      if (m.id !== id) return m;
      const now = new Date();
      const hora = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      return { ...m, estado: m.estado === 'tomado' ? 'pendiente' : 'tomado', hora: m.estado === 'tomado' ? null : hora };
    }));
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] min-h-[100dvh] flex flex-col w-full relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .filled { font-variation-settings: 'FILL' 1; }
        * { font-family: 'DM Sans', sans-serif; }
        .slide-up { animation: slideUp 0.25s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        input:focus { outline: none; }
        .chip { display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer;border:2px solid;transition:all 0.15s;text-transform:uppercase;letter-spacing:0.03em; }
        .chip-tomado-active { background:#dcfce7;color:#16a34a;border-color:#16a34a; }
        .chip-pendiente-active { background:#fef3c7;color:#d97706;border-color:#d97706; }
        .chip-manana-active { background:#f1f5f9;color:#64748b;border-color:#64748b; }
        .chip-inactive { background:white;color:#94a3b8;border-color:#e2e8f0; }
        .hora-chip { display:inline-flex;padding:5px 11px;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s; }
        .hora-chip-active { border-color:#1775d3;background:#eff6ff;color:#1775d3; }
        .hora-chip-inactive { background:white;color:#64748b; }
      `}</style>

      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center border-b border-slate-100 sticky top-0 z-20 pt-12">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[#1f2937]">arrow_back</span>
        </button>
        <div className="flex-1 flex items-center justify-center gap-2 pr-10">
          <span className="w-7 h-7 rounded-lg bg-[#1775d3] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[16px]">qr_code_scanner</span>
          </span>
          <span className="text-lg font-black text-[#1775d3] tracking-tight">MedScan <span className="text-[#1f2937]">IA</span></span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pb-32">

        {/* Profile card */}
        <div className="flex flex-col items-center pt-8 pb-6 bg-white shadow-sm rounded-b-3xl mb-6">
          <div className="relative">
            <img src="https://i.pravatar.cc/150?img=32" alt="Paca López" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3" />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-[#1f2937]">Paca López</h2>
          <button className="text-[#1775d3] text-sm font-medium mt-1 flex items-center gap-1 active:opacity-70">
            Ver historial médico <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Medications */}
        <div className="px-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#1f2937]">Medicamentos</h3>
            <span className="text-xs text-slate-400 font-medium">{meds.length} registrados</span>
          </div>

          {meds.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">Sin medicamentos registrados</div>
          )}

          {meds.map(m => {
            const c = COLOR_MAP[m.color] || COLOR_MAP.blue;
            return (
              <article key={m.id}
                className="bg-white rounded-xl p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 slide-up">
                <div className={`w-12 h-12 rounded-full ${c.bg} flex items-center justify-center ${c.text} shrink-0`}>
                  <span className="material-symbols-outlined text-[24px]">{m.icono}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-[#1f2937] truncate">{m.nombre}</h4>
                  <p className="text-sm text-slate-500 truncate">{m.dosis}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {m.estado === 'tomado' && (
                    <button onClick={() => toggleTomado(m.id)}
                      className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                      {m.hora}
                    </button>
                  )}
                  {m.estado === 'pendiente' && (
                    <button onClick={() => toggleTomado(m.id)}
                      className="bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      Marcar
                    </button>
                  )}
                  {m.estado === 'manana' && (
                    <div className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">calendar_month</span>
                      Mañana
                    </div>
                  )}
                  <button onClick={() => handleRemove(m.id)}
                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </article>
            );
          })}

          <button onClick={() => setShowModal(true)}
            className="w-full mt-2 bg-[#1775d3] hover:bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(23,117,211,0.3)] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
            Añadir nuevo medicamento
          </button>
        </div>
      </main>

      {/* Bottom nav */}


      {/* ── Modal añadir medicamento ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center"
          onClick={resetModal}>
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 slide-up"
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-[#1f2937]">Nuevo medicamento</h3>
              <button onClick={resetModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                placeholder="Ej: Ibuprofeno 600mg"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all"
              />
            </div>

            {/* Dosis */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Dosis / Pauta <span className="text-red-400">*</span>
              </label>
              <input
                value={form.dosis}
                onChange={e => setForm(f => ({ ...f, dosis: e.target.value }))}
                placeholder="Ej: 1 comprimido cada 8h"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all"
              />
            </div>

            {/* Estado del medicamento */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">Estado al registrar</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setNuevoEstado('tomado')}
                  className={`chip ${nuevoEstado === 'tomado' ? 'chip-tomado-active' : 'chip-inactive'}`}>
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Tomado hoy
                </button>
                <button
                  onClick={() => setNuevoEstado('pendiente')}
                  className={`chip ${nuevoEstado === 'pendiente' ? 'chip-pendiente-active' : 'chip-inactive'}`}>
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Pendiente
                </button>
                <button
                  onClick={() => setNuevoEstado('manana')}
                  className={`chip ${nuevoEstado === 'manana' ? 'chip-manana-active' : 'chip-inactive'}`}>
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  Mañana
                </button>
              </div>
            </div>

            {/* Hora — solo si está tomado */}
            {nuevoEstado === 'tomado' && (
              <div className="slide-up">
                <label className="block text-xs font-semibold text-slate-500 mb-2">
                  Hora en que se tomó <span className="text-slate-300 font-normal">(opcional — si no, se usa la hora actual)</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {HORAS_RAPIDAS.map(h => (
                    <button key={h}
                      onClick={() => { setHoraSeleccionada(h); setHoraCustom(''); }}
                      className={`hora-chip ${horaSeleccionada === h && !horaCustom ? 'hora-chip-active' : 'hora-chip-inactive'}`}>
                      {h}
                    </button>
                  ))}
                </div>
                <input
                  type="time"
                  value={horaCustom}
                  onChange={e => { setHoraCustom(e.target.value); setHoraSeleccionada(''); }}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all"
                  placeholder="O introduce hora manualmente"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  Se registrará como: <span className="font-semibold text-green-600">
                    {horaCustom || horaSeleccionada || (() => {
                      const now = new Date();
                      return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
                    })()}
                  </span>
                </p>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>{error}
              </p>
            )}

            <button onClick={handleAdd}
              className="w-full h-14 bg-[#1775d3] text-white rounded-2xl font-bold text-base shadow-[0_8px_24px_rgba(23,117,211,0.25)] active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
              Guardar medicamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}