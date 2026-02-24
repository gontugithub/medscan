import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar pb-12">
      <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-6 active:scale-95">
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
      <h2 className="text-3xl font-bold mb-6 text-text-main">Crea tu cuenta</h2>
      <div className="space-y-4">
        {['Nombre completo', 'Apellidos', 'Email', 'Teléfono', 'Contraseña', 'Confirmar contraseña'].map((label, i) => (
          <div key={i}>
            <label className="block text-lg font-medium text-slate-700 mb-2">{label}</label>
            <input type={label.includes('Contraseña') ? 'password' : 'text'} className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 focus:border-primary text-lg bg-white outline-none" />
          </div>
        ))}
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Fecha de nacimiento</label>
          <input type="date" className="w-full h-16 px-4 rounded-2xl border-2 border-slate-200 focus:border-primary text-lg bg-white outline-none" />
        </div>
        <button onClick={() => navigate('/role')} className="w-full h-16 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg mt-8 active:scale-95 transition-transform">
          Registrarse
        </button>
      </div>
    </div>
  );
}