// --- ProcessingPage.jsx ---
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProcessingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const mode = state?.mode || 'ask'; 

  useEffect(() => {
    const processImage = async () => {
      const mockData = {
        nombre: "IBUPROFENO 600mg",
        foto_url: "https://cima.aemps.es/cima/fotos/thumbnails/formafarmaceutica/660905/660905_tf.jpg"
      };

      setTimeout(() => {
        // AQUÍ ESTÁ EL CAMBIO:
        // Si el modo es 'ask', va al chat normal (paciente)
        // Si el modo es 'add', va al chat de médico
        const targetPath = mode === 'ask' ? '/chat' : '/chat-medico';

        navigate(targetPath, { 
          state: { 
            nombreMedicamento: mockData.nombre, 
            fotoUrl: mockData.foto_url,
            mode: mode 
          } 
        });
      }, 2000);
    };

    if (state?.foto) processImage();
    else navigate('/add-patient');
  }, [navigate, state, mode]);

  return (
    <div className="bg-[#1775d3] min-h-screen flex flex-col items-center justify-center text-white text-center">
      <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-black uppercase tracking-tighter">Analizando con IA</h2>
      <p className="opacity-80 mt-2 font-bold">Extrayendo información...</p>
    </div>
  );
}