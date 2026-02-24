import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

export default function ProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const foto = location.state?.foto;
    const cn = location.state?.cn;
    const nombreMedicamento = location.state?.nombreMedicamento;
    const fotoUrl = location.state?.fotoUrl;

    if (!foto && !cn) {
      setError("No se recibió ninguna imagen ni código nacional.");
      return;
    }

    const processMedication = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        let data;

        if (foto) {
          // Flujo cámara: sube la foto y obtiene codigo_nacional del backend
          const formData = new FormData();
          formData.append('foto', foto, 'escaneo.jpg');
          data = await api.uploadImage(formData);

          // Buscar la foto del medicamento usando el CN que devuelve el backend
          const infoExtra = await api.getMedicamentoInfo(data.codigo_nacional).catch(() => null);

          navigate('/chat', {
            state: {
              nombreMedicamento: data.nombre_medicamento,
              sourceId: data.source_id,
              fotoUrl: infoExtra?.foto_url || null,  // 👈 foto del medicamento
            },
          });

        } else {
          // Flujo lista: viene con CN directamente
          data = await api.uploadByCn(cn);

          navigate('/chat', {
            state: {
              nombreMedicamento: data.nombre_medicamento || nombreMedicamento,
              sourceId: data.source_id,
              fotoUrl: data.foto_url || fotoUrl,
            },
          });
        }

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
          onClick={() => navigate('/camera')}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg"
        >
          Volver a escanear
        </button>
      )}
    </div>
  );
}