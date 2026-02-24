import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api'; // <-- Mantenemos el uso de tu servicio

export default function ProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); 

  useEffect(() => {
    const foto = location.state?.foto;

    if (!foto) {
      setError("No se recibió ninguna imagen. Vuelve a escanear.");
      return;
    }

    const processMedication = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const formData = new FormData();
      formData.append('foto', foto, 'escaneo.jpg');

      try {
        // Usamos el servicio centralizado que acabamos de limpiar
        const data = await api.uploadImage(formData);

        // Si todo va bien (200 OK), navegamos al chat con los datos
        navigate('/chat', { 
          state: { 
            nombreMedicamento: data.nombre_medicamento,
            sourceId: data.source_id 
          } 
        });

      } catch (err) {
        setError(err.message);
      }
    };

    processMedication();
  }, [navigate, location]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg-app p-6 h-screen">
      <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-8 border-slate-200"></div>
        <div className={`absolute inset-0 rounded-full border-8 border-t-transparent ${error ? 'border-red-500' : 'border-primary animate-spin'}`}></div>
        <span className={`material-symbols-outlined text-5xl ${error ? 'text-red-500' : 'text-primary'}`}>
          {error ? 'error' : 'document_scanner'}
        </span>
      </div>
      
      <h2 className="text-4xl font-bold text-slate-800 mb-2">
        {error ? "Error" : "Analizando..."}
      </h2>
      
      <p className="text-xl text-slate-500 text-center px-4">
        {error ? error : "Consultando base de datos CIMA y procesando prospecto."}
      </p>

      {error && (
        <button 
          onClick={() => navigate('/')} 
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg"
        >
          Volver a escanear
        </button>
      )}
    </div>
  );
}