import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CameraPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [streamActive, setStreamActive] = useState(false);
  // NUEVO: Estado para mostrar u ocultar las instrucciones
  const [showInstructions, setShowInstructions] = useState(false);

  // Iniciar la cámara al montar
  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Función para capturar desde la cámara
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !streamActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        navigate('/processing', { state: { foto: blob } });
      }
    }, 'image/jpeg', 0.8);
  };

  // Función para manejar la subida desde la galería
  const handleGallerySelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      navigate('/processing', { state: { foto: file } });
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col font-display overflow-hidden">
      
      {/* Multimedia */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      <canvas ref={canvasRef} className="hidden" />
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleGallerySelect} 
        className="hidden" 
      />

      {/* Header Superior */}
      <div className="p-6 flex justify-between items-center text-white mt-8 z-20 relative pt-safe bg-gradient-to-b from-black/60 to-transparent pb-10">
        <h2 className="text-2xl font-bold tracking-wide drop-shadow-lg">MedScan</h2>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/50 backdrop-blur-md text-white active:scale-95 border border-white/20 shadow-lg"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
          <span className="font-bold text-lg">Cancelar</span>
        </button>
      </div>
      
      {/* Marco central del escáner */}
      <div className="flex-3 relative flex flex-col items-center justify-center z-1 px-10">
        
        {/* NUEVO: Botón de Ayuda justo encima del escáner */}
        <button 
          onClick={() => setShowInstructions(true)}
          className="mb-6 flex items-center gap-2 bg-[#1775d3] text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(23,117,211,0.5)] border-2 border-white/20 active:scale-95 transition-transform backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-[28px]">info</span>
          <span className="text-lg font-bold">¿Cómo hacer la foto?</span>
        </button>

        <div className="w-full max-w-[320px] aspect-square border-[6px] border-[#1775d3] rounded-3xl z-10 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 w-full h-[3px] bg-white shadow-[0_0_20px_#ffffff] animate-[scan_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Instrucción corta */}
        <div className="mt-8 bg-black/70 px-6 py-4 rounded-2xl border border-white/20 text-center mx-4 shadow-xl">
          <p className="text-white text-xl font-bold">
            Enfoca la caja del medicamento
          </p>
        </div>
      </div>
      
      {/* Controles Inferiores */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-24 pb-12 px-8 flex justify-center items-end gap-10 z-30">
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-white backdrop-blur-md shadow-lg">
            <span className="material-symbols-outlined text-[32px]">photo_library</span>
          </div>
          <span className="text-white font-bold text-lg drop-shadow-md">Galería</span>
        </button>

        <button 
          onClick={handleCapture} 
          className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-24 h-24 bg-white rounded-full border-[8px] border-[#1775d3] flex items-center justify-center shadow-[0_0_25px_rgba(23,117,211,0.6)]">
             <span className="material-symbols-outlined text-[40px] text-[#1775d3]">photo_camera</span>
          </div>
          <span className="text-white font-bold text-lg drop-shadow-md">Hacer Foto</span>
        </button>
      </div>

      {/* NUEVO: Ventana de Instrucciones (Modal) pensada para mayores */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm flex flex-col items-center text-center shadow-2xl relative">
            
            <div className="w-20 h-20 bg-blue-50 text-[#1775d3] rounded-full flex items-center justify-center mb-4 border-4 border-blue-100">
              <span className="material-symbols-outlined text-[40px]">document_scanner</span>
            </div>
            
            <h3 className="text-3xl font-bold text-[#1f2937] mb-6">¿Qué debo enfocar?</h3>
            
            <div className="space-y-4 text-left w-full mb-8">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="material-symbols-outlined text-[#1775d3] text-[32px]">123</span>
                <p className="text-xl text-slate-700 font-medium leading-tight">
                  Busca el <strong>Código Nacional (CN)</strong> o el código de barras en la caja.
                </p>
              </div>
              
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="material-symbols-outlined text-[#1775d3] text-[32px]">qr_code</span>
                <p className="text-xl text-slate-700 font-medium leading-tight">
                  Suele ser un número de 6 o 7 cifras (Ejemplo: <strong>C.N. 123456</strong>).
                </p>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="material-symbols-outlined text-[#1775d3] text-[32px]">light_mode</span>
                <p className="text-xl text-slate-700 font-medium leading-tight">
                  Asegúrate de que haya buena luz y el móvil esté quieto.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowInstructions(false)}
              className="w-full h-[70px] bg-[#1775d3] text-white text-2xl font-bold rounded-2xl shadow-[0_8px_20px_rgba(23,117,211,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
              ¡Entendido!
            </button>

          </div>
        </div>
      )}

    </div>
  );
}