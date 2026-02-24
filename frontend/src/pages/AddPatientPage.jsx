import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_PATIENTS = [
  {
    id: 'P-00124',
    nombre: 'Paca',
    apellidos: 'López Martínez',
    fechaNacimiento: '1948-03-12',
    foto: null,
    medicamentos: [
      { nombre: 'Metformina', dosis: '500mg', frecuencia: '2x día', tomado: true },
      { nombre: 'Atorvastatina', dosis: '20mg', frecuencia: '1x noche', tomado: false },
    ],
    color: '#dbeafe',
  },
  {
    id: 'P-00087',
    nombre: 'María',
    apellidos: 'Rodrigo Sánchez',
    fechaNacimiento: '1962-07-25',
    foto: null,
    medicamentos: [
      { nombre: 'Omeprazol', dosis: '20mg', frecuencia: '1x mañana', tomado: true },
    ],
    color: '#dcfce7',
  },
];

function calcEdad(fechaNacimiento) {
  if (!fechaNacimiento) return '';
  const hoy = new Date();
  const nac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nac.getFullYear();
  if (hoy < new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate())) edad--;
  return edad;
}

const PASTEL_COLORS = ['#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3', '#ede9fe', '#ffedd5'];

export default function AddPatientPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: '', nombre: '', apellidos: '', fechaNacimiento: '', foto: null, medicamentos: [] });
  const [medForm, setMedForm] = useState({ nombre: '', dosis: '', frecuencia: '' });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const fotoRef = useRef();

  const handleInput = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, foto: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.id.trim()) e.id = 'Requerido';
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    if (!form.apellidos.trim()) e.apellidos = 'Requerido';
    if (!form.fechaNacimiento) e.fechaNacimiento = 'Requerido';
    if (patients.find(p => p.id === form.id.trim())) e.id = 'ID ya existe';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addMed = () => {
    if (!medForm.nombre.trim() || !medForm.dosis.trim()) return;
    setForm(f => ({ ...f, medicamentos: [...f.medicamentos, { ...medForm, tomado: false }] }));
    setMedForm({ nombre: '', dosis: '', frecuencia: '' });
  };

  const removeMed = (i) => setForm(f => ({ ...f, medicamentos: f.medicamentos.filter((_, idx) => idx !== i) }));

  const toggleTomado = (patientId, medIdx, e) => {
    e.stopPropagation();
    setPatients(ps => ps.map(p => {
      if (p.id !== patientId) return p;
      const meds = p.medicamentos.map((m, i) => i === medIdx ? { ...m, tomado: !m.tomado } : m);
      return { ...p, medicamentos: meds };
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const color = PASTEL_COLORS[patients.length % PASTEL_COLORS.length];
    setPatients(ps => [...ps, { ...form, color }]);
    setForm({ id: '', nombre: '', apellidos: '', fechaNacimiento: '', foto: null, medicamentos: [] });
    setShowForm(false);
  };

  const filtered = patients.filter(p =>
    `${p.nombre} ${p.apellidos} ${p.id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-[#f0f4ff] text-[#1e293b] min-h-[100dvh] flex flex-col w-full relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .filled { font-variation-settings: 'FILL' 1; }
        .tag { display:inline-flex;align-items:center;gap:4px;background:#eff6ff;color:#2563eb;border-radius:8px;padding:3px 10px;font-size:12px;font-weight:500; }
        .tag-pill { background:#f0fdf4;color:#16a34a; }
        .tag-warn { background:#fff7ed;color:#ea580c; }
        input:focus,select:focus{outline:none;}
        .slide-up{animation:slideUp 0.28s cubic-bezier(.4,0,.2,1) both;}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .card-hover{transition:box-shadow 0.15s,transform 0.15s;}
        .card-hover:active{transform:scale(0.98);}
      `}</style>

      {/* Header — Logo MedScan IA */}
      <header className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#1775d3] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">qr_code_scanner</span>
          </span>
          <span className="text-xl font-black text-[#1775d3] tracking-tight">MedScan <span className="text-[#1e293b]">IA</span></span>
        </div>
        <span className="text-xs text-slate-400 font-medium">{patients.length} pacientes</span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 pb-28 space-y-5">

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o ID..."
            className="w-full h-12 pl-10 pr-4 rounded-2xl border border-slate-200 bg-white text-sm shadow-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all" />
        </div>

        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="w-full h-14 bg-[#1775d3] hover:bg-blue-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[22px]">person_add</span>
            Añadir nuevo paciente
          </button>
        )}

        {/* Form — sin tabs, todo en un solo scroll */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden slide-up">
            <div className="px-5 pt-5 pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#1e293b]">Nuevo paciente</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rellena los datos del paciente y su medicación</p>
            </div>

            <div className="p-5 space-y-5">
              {/* ── Datos personales ── */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Datos personales</p>

                {/* Foto */}
                <div className="flex flex-col items-center gap-2 pb-1">
                  <input type="file" accept="image/*" ref={fotoRef} className="hidden" onChange={handleFoto} />
                  <div
                    onClick={() => fotoRef.current.click()}
                    className="w-20 h-20 rounded-full cursor-pointer overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#1775d3] transition-all relative group"
                  >
                    {form.foto
                      ? <img src={form.foto} alt="foto" className="w-full h-full object-cover" />
                      : <span className="material-symbols-outlined text-slate-400 text-[32px]">add_a_photo</span>
                    }
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-all">
                      <span className="material-symbols-outlined text-white text-[20px]">edit</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Foto <span className="text-slate-300">(opcional)</span></p>
                </div>

                <Field label="ID / Código único" required>
                  <input value={form.id} onChange={e => handleInput('id', e.target.value)} placeholder="Ej: P-00142"
                    className={`w-full h-12 px-4 rounded-xl border text-sm ${errors.id ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-[#1775d3] focus:bg-white focus:ring-2 focus:ring-[#1775d3]/10 transition-all`} />
                  {errors.id && <p className="text-xs text-red-500 mt-1">{errors.id}</p>}
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nombre" required>
                    <input value={form.nombre} onChange={e => handleInput('nombre', e.target.value)} placeholder="Nombre"
                      className={`w-full h-12 px-4 rounded-xl border text-sm ${errors.nombre ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-[#1775d3] focus:bg-white focus:ring-2 focus:ring-[#1775d3]/10 transition-all`} />
                    {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                  </Field>
                  <Field label="Apellidos" required>
                    <input value={form.apellidos} onChange={e => handleInput('apellidos', e.target.value)} placeholder="Apellidos"
                      className={`w-full h-12 px-4 rounded-xl border text-sm ${errors.apellidos ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-[#1775d3] focus:bg-white focus:ring-2 focus:ring-[#1775d3]/10 transition-all`} />
                    {errors.apellidos && <p className="text-xs text-red-500 mt-1">{errors.apellidos}</p>}
                  </Field>
                </div>

                <Field label="Fecha de nacimiento" required>
                  <input type="date" value={form.fechaNacimiento} onChange={e => handleInput('fechaNacimiento', e.target.value)}
                    className={`w-full h-12 px-4 rounded-xl border text-sm ${errors.fechaNacimiento ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-[#1775d3] focus:bg-white focus:ring-2 focus:ring-[#1775d3]/10 transition-all`} />
                  {errors.fechaNacimiento && <p className="text-xs text-red-500 mt-1">{errors.fechaNacimiento}</p>}
                </Field>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* ── Medicación ── */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Medicación <span className="normal-case font-normal text-slate-300">(opcional)</span></p>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                  <input value={medForm.nombre} onChange={e => setMedForm(m => ({ ...m, nombre: e.target.value }))}
                    placeholder="Nombre del medicamento"
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={medForm.dosis} onChange={e => setMedForm(m => ({ ...m, dosis: e.target.value }))}
                      placeholder="Dosis (ej: 500mg)"
                      className="h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all" />
                    <input value={medForm.frecuencia} onChange={e => setMedForm(m => ({ ...m, frecuencia: e.target.value }))}
                      placeholder="Frecuencia (ej: 2x día)"
                      className="h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-[#1775d3] focus:ring-2 focus:ring-[#1775d3]/10 transition-all" />
                  </div>
                  <button onClick={addMed} disabled={!medForm.nombre.trim() || !medForm.dosis.trim()}
                    className="w-full h-10 bg-[#eff6ff] text-[#1775d3] rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-blue-100 transition-all flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Añadir medicamento
                  </button>
                </div>

                {form.medicamentos.length > 0 && (
                  <div className="space-y-2">
                    {form.medicamentos.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                        <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[#1775d3] text-[18px]">medication</span>
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{m.nombre}</p>
                          <p className="text-xs text-slate-400">{m.dosis}{m.frecuencia ? ` · ${m.frecuencia}` : ''}</p>
                        </div>
                        <button onClick={() => removeMed(i)} className="text-slate-300 hover:text-red-400 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {form.medicamentos.length === 0 && (
                  <div className="text-center py-2 text-xs text-slate-400">Sin medicamentos añadidos aún</div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-3 pt-1">
                <button onClick={() => { setShowForm(false); setErrors({}); setForm({ id: '', nombre: '', apellidos: '', fechaNacimiento: '', foto: null, medicamentos: [] }); }}
                  className="flex-1 h-12 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button onClick={handleSubmit}
                  className="flex-1 h-12 bg-[#1775d3] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  Guardar paciente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patient List */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">Pacientes registrados</p>
          {filtered.length === 0 && <div className="text-center py-10 text-slate-400 text-sm">No se encontraron pacientes</div>}
          <div className="space-y-3">
            {filtered.map(p => {
              const totalMeds = p.medicamentos.length;
              const tomados = p.medicamentos.filter(m => m.tomado).length;
              const allTomados = totalMeds > 0 && tomados === totalMeds;
              const noneTomados = tomados === 0;
              return (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-hover cursor-pointer"
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                  <div className="flex items-center gap-4 px-4 py-4">
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden" style={{ background: p.color }}>
                      {p.foto
                        ? <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-500">
                          {p.nombre[0]}{p.apellidos[0]}
                        </div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1e293b]">{p.nombre} {p.apellidos}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="tag">{p.id}</span>
                        {p.fechaNacimiento && <span className="text-xs text-slate-400">{calcEdad(p.fechaNacimiento)} años</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {totalMeds > 0 && (
                        <span className={`tag ${allTomados ? 'tag-pill' : noneTomados ? 'tag-warn' : ''}`}
                          style={!allTomados && !noneTomados ? { background: '#eff6ff', color: '#1775d3' } : {}}>
                          <span className="material-symbols-outlined text-[13px]">{allTomados ? 'check_circle' : 'medication'}</span>
                          {tomados}/{totalMeds}
                        </span>
                      )}
                      <span className="material-symbols-outlined text-slate-300 text-[20px]"
                        style={{ transform: expandedId === p.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {expandedId === p.id && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-3 space-y-3 slide-up">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <InfoRow label="ID" value={p.id} />
                        <InfoRow label="Nacimiento" value={p.fechaNacimiento ? new Date(p.fechaNacimiento).toLocaleDateString('es-ES') : '—'} />
                        <InfoRow label="Nombre completo" value={`${p.nombre} ${p.apellidos}`} span />
                      </div>

                      {p.medicamentos.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Medicación de hoy</p>
                          <div className="space-y-2">
                            {p.medicamentos.map((m, i) => (
                              <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all ${m.tomado ? 'bg-green-50' : 'bg-slate-50'}`}>
                                <span className={`material-symbols-outlined text-[18px] ${m.tomado ? 'text-green-500' : 'text-[#1775d3]'}`}>
                                  {m.tomado ? 'check_circle' : 'medication'}
                                </span>
                                <div className="flex-1">
                                  <p className={`text-sm font-semibold ${m.tomado ? 'line-through text-slate-400' : ''}`}>{m.nombre}</p>
                                  <p className="text-xs text-slate-400">{m.dosis}{m.frecuencia ? ` · ${m.frecuencia}` : ''}</p>
                                </div>
                                <button
                                  onClick={(e) => toggleTomado(p.id, i, e)}
                                  className={`h-8 px-3 rounded-lg text-xs font-semibold transition-all ${m.tomado ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-white border border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-600'}`}>
                                  {m.tomado ? 'Tomado ✓' : 'Marcar'}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {p.medicamentos.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-1">Sin medicamentos registrados</p>
                      )}

                      <button onClick={e => { e.stopPropagation(); navigate('/profile'); }}
                        className="w-full h-10 border border-[#1775d3] text-[#1775d3] rounded-xl text-sm font-semibold hover:bg-blue-50 transition-all">
                        Ver perfil completo
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ label, value, span }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-[#1e293b]">{value}</p>
    </div>
  );
}