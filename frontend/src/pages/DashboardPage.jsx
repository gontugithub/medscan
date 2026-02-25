  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MedScanLogo from '../components/MedScan_Logo.jsx';

export default function DashboardPage() {
  const navigate = useNavigate();
  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Array de datos basado en tu HTML exacto
  const patients = [
    {
      id: 1,
      name: "Paca López",
      age: "78 años",
      med: "Paracetamol 1g",
      medIcon: "medication",
      time: "09:15",
      statusLabel: "Última toma",
      statusIcon: "check_circle",
      type: "success",
      img: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      name: "Antonio García",
      age: "82 años",
      med: "Sintrom 4mg",
      medIcon: "pill",
      time: "Pendiente",
      statusLabel: "12:30",
      statusIcon: "schedule",
      type: "warning", // Naranja
      img: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 3,
      name: "María Rodriguez",
      age: "75 años",
      med: "Enalapril 20mg",
      medIcon: "water_drop",
      time: "Retrasada",
      statusLabel: "Era 09:00",
      statusIcon: "warning",
      type: "danger", // Rojo
      img: "https://i.pravatar.cc/150?img=5"
    }
  ];

  // Filtramos los pacientes basándonos en lo que el usuario escribe
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener los colores exactos de tu HTML según el estado
  const getStatusColors = (type) => {
    switch (type) {
      case 'success': return { dot: 'bg-green-500', badge: 'bg-green-50 text-green-700' };
      case 'warning': return { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700' };
      case 'danger': return { dot: 'bg-red-500', badge: 'bg-red-50 text-red-700' };
      default: return { dot: 'bg-slate-500', badge: 'bg-slate-50 text-slate-700' };
    }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col overflow-hidden w-full relative">
      
      {/* Header / Top Bar */}
      <header className="bg-white px-5 pb-4 pt-10 flex flex-col gap-4 sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-medium text-[#6b7280]">Buenos días,</p>
            <h1 className="text-2xl font-bold tracking-tight">Mis Pacientes</h1>
          </div>
          <button className="bg-[#1775d3]/10 text-[#1775d3] rounded-full w-10 h-10 flex items-center justify-center transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </div>

        {/* Search/Filter Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Buscar paciente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm text-[#1f2937] placeholder-slate-400 focus:ring-2 focus:ring-[#1775d3]/50 outline-none transition-all shadow-sm"
          />
        </div>
      </header>

      {/* Main Content: Scrollable List */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-[#f6f7f8] pb-24 relative no-scrollbar">
        
        {/* Mostramos los pacientes filtrados */}
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => {
            const colors = getStatusColors(patient.type);
            
            return (
              <article 
                key={patient.id} 
                onClick={() => navigate('/profile')}
                className="group bg-white rounded-xl p-4 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#1775d3]/20 cursor-pointer relative overflow-hidden"
              >
                {/* Elemento decorativo del fondo de la tarjeta */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1775d3]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img src={patient.img} alt={patient.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${colors.dot}`}></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold truncate">{patient.name}</h3>
                      <span className="text-xs font-medium text-[#6b7280] bg-slate-100 px-2 py-1 rounded-md">{patient.age}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
                      <span className="material-symbols-outlined text-[16px] text-[#1775d3]">{patient.medIcon}</span>
                      <span className="truncate">{patient.med}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium w-fit ${colors.badge}`}>
                        <span className="material-symbols-outlined text-[14px]">{patient.statusIcon}</span>
                        <span>{patient.time}</span>
                      </div>
                      <span className="text-xs text-slate-400">{patient.statusLabel}</span>
                    </div>
                  </div>

                  <div className="text-slate-300">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          /* Estado cuando no hay resultados de búsqueda */
          <div className="text-center py-10 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-2">search_off</span>
            <p className="font-medium text-lg">No se encontraron pacientes</p>
          </div>
        )}
        

        {/* Empty State / Add Suggestion */}
        <div 
          onClick={() => navigate('/add-patient')}
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-center cursor-pointer active:scale-95 transition-transform mt-8"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-3">
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <p className="text-sm font-medium text-slate-500">¿Tienes un nuevo paciente?</p>
          <p className="text-xs text-slate-400 mt-1">Escanea su medicación para comenzar</p>
        </div>
      </main>

      {/* FAB (Floating Action Button) */}
      <div className="absolute bottom-24 right-5 z-20">
        <button 
          onClick={() => navigate('/add-patient')}
          className="bg-[#1775d3] hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg shadow-[#1775d3]/30 flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[32px]">add</span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-slate-100 px-6 py-2 pb-safe flex justify-between items-center z-30">
        <button className="flex flex-col items-center justify-center w-16 gap-1 group">
          <div className="bg-[#1775d3]/10 text-[#1775d3] w-12 h-8 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[24px] filled">group</span>
          </div>
          <span className="text-[11px] font-medium text-[#1775d3] tracking-wide mt-1">Pacientes</span>
        </button>
        
        <button onClick={() => navigate('/add-patient')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Añadir</span>
        </button>
        
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-16 gap-1 group text-slate-400 hover:text-[#1775d3] transition-colors">
          <div className="w-12 h-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </div>
          <span className="text-[11px] font-medium tracking-wide mt-1">Perfil</span>
        </button>
      </nav>
      
    </div>
  );
}