import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_MED_DB = {
  '665544': { nombre: 'Ibuprofeno 600mg', cnm: '665544' },
  '123456': { nombre: 'Paracetamol 1g', cnm: '123456' },
  '789012': { nombre: 'Omeprazol 20mg', cnm: '789012' },
  '334455': { nombre: 'Amoxicilina 500mg', cnm: '334455' },
  '556677': { nombre: 'Atorvastatina 20mg', cnm: '556677' },
  '998877': { nombre: 'Metformina 850mg', cnm: '998877' },
};

const INTERVALOS = ['Cada 4h', 'Cada 6h', 'Cada 8h', 'Cada 12h', 'Cada 24h', 'Según pauta'];
const HORAS_OPCIONES = ['06:00', '08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '20:00', '22:00'];

export default function AddMedicationPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [cnm, setCnm] = useState('');
  const [dosis, setDosis] = useState('');
  const [frecuencia, setFrecuencia] = useState('diaria');
  const [intervalo, setIntervalo] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [notas, setNotas] = useState('');

  // Manual CNM lookup: autocomplete nombre when user types a known CNM
  const handleCnmChange = (val) => {
    setCnm(val);
    const clean = val.replace(/^0+/, '');
    const found = MOCK_MED_DB[val] || MOCK_MED_DB[clean];
    if (found) setNombre(found.nombre);
  };

  const canSave = nombre.trim() && dosis.trim();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-[#f0f4ff] text-[#1e293b] min-h-[100dvh] flex flex-col w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .filled { font-variation-settings: 'FILL' 1; }
        input:focus, textarea:focus { outline: none; }
        .slide-up { animation: slideUp 0.28s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .chip { display:inline-flex;align-items:center;padding:6px 14px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid;transition:all 0.15s; }
        .chip-active { background:#2563eb;color:white;border-color:#2563eb; }
        .chip-inactive { background:white;color:#64748b;border-color:#e2e8f0; }
      `}</style>

      <header className="bg-white px-5 pt-12 pb-4 flex items-center border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full active:scale-95 transition-all mr-3">
          <span className="material-symbols-outlined text-[#1e293b]">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#2563eb] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">medical_services</span>
          </span>
          <h1 className="text-lg font-bold text-[#1775d3]">Nuevo medicamento</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 pb-32 space-y-4">

        {/* Medication data */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Datos del medicamento</p>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Nombre del medicamento <span className="text-red-400">*</span>
            </label>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Ibuprofeno 600mg"
              className={`w-full h-12 px-4 rounded-xl border text-sm transition-all
                ${nombre ? 'border-[#2563eb] bg-blue-50/40 focus:bg-white' : 'border-slate-200 bg-slate-50'}
                focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Código Nacional (CNM)</label>
            <input
              value={cnm}
              onChange={e => handleCnmChange(e.target.value)}
              type="number"
              placeholder="Ej: 665544"
              className={`w-full h-12 px-4 rounded-xl border text-sm transition-all
                ${cnm ? 'border-[#2563eb] bg-blue-50/40 focus:bg-white' : 'border-slate-200 bg-slate-50'}
                focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10`}
            />
            {cnm && (MOCK_MED_DB[cnm] || MOCK_MED_DB[cnm.replace(/^0+/, '')]) && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                {(MOCK_MED_DB[cnm] || MOCK_MED_DB[cnm.replace(/^0+/, '')]).nombre}
              </p>
            )}
            {cnm && !(MOCK_MED_DB[cnm] || MOCK_MED_DB[cnm.replace(/^0+/, '')]) && cnm.length >= 5 && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                CNM no encontrado en base de datos local
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Dosis <span className="text-red-400">*</span>
            </label>
            <input
              value={dosis}
              onChange={e => setDosis(e.target.value)}
              placeholder="Ej: 1 comprimido, 500mg, 5ml..."
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10 transition-all"
            />
          </div>
        </div>

        {/* Pauta */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pauta de administración</p>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Tipo de frecuencia</label>
            <div className="flex gap-2 flex-wrap">
              {['diaria', 'puntual', 'pauta'].map(op => (
                <button key={op} onClick={() => setFrecuencia(op)} className={`chip ${frecuencia === op ? 'chip-active' : 'chip-inactive'}`}>
                  <span className="material-symbols-outlined text-[16px] mr-1">
                    {op === 'diaria' ? 'today' : op === 'puntual' ? 'event' : 'assignment'}
                  </span>
                  {op === 'diaria' ? 'Diaria' : op === 'puntual' ? 'Puntual' : 'Según pauta'}
                </button>
              ))}
            </div>
          </div>

          {frecuencia !== 'pauta' && (
            <div className="slide-up">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Intervalo</label>
              <div className="flex flex-wrap gap-2">
                {INTERVALOS.map(iv => (
                  <button key={iv} onClick={() => setIntervalo(iv)}
                    className={`chip ${intervalo === iv ? 'chip-active' : 'chip-inactive'}`}
                    style={{ padding: '5px 12px', fontSize: 12 }}>
                    {iv}
                  </button>
                ))}
              </div>
            </div>
          )}

          {frecuencia === 'diaria' && (
            <div className="slide-up">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Hora de inicio</label>
              <div className="flex flex-wrap gap-2">
                {HORAS_OPCIONES.map(h => (
                  <button key={h} onClick={() => setHoraInicio(h)}
                    className={`chip ${horaInicio === h ? 'chip-active' : 'chip-inactive'}`}
                    style={{ padding: '5px 12px', fontSize: 12 }}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Notas adicionales</label>
            <textarea
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Ej: Tomar con el estómago lleno..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-[#2563eb]/10 transition-all resize-none"
            />
          </div>
        </div>

        {/* Preview card */}
        {nombre && dosis && (
          <div className="bg-blue-50 rounded-2xl px-4 py-3 flex items-center gap-3 slide-up border border-blue-100">
            <span className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[#2563eb] text-[22px]">medication</span>
            </span>
            <div>
              <p className="font-bold text-[#1e293b] text-sm">{nombre}</p>
              <p className="text-xs text-slate-500">
                {dosis}
                {cnm ? ` · CNM: ${cnm}` : ''}
                {intervalo ? ` · ${intervalo}` : ''}
                {horaInicio ? ` · desde ${horaInicio}` : ''}
              </p>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-4 pb-safe">
        <button
          disabled={!canSave}
          onClick={() => navigate('/profile')}
          className="w-full h-14 bg-[#2563eb] disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-bold text-base shadow-[0_8px_24px_rgba(37,99,235,0.25)] active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>
          Guardar medicamento
        </button>
      </div>
    </div>
  );
}