import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CameraPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  // Iniciar la cámara al montar
  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 }, // Pedimos buena resolución para que el OCR no falle
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

    // Limpieza al desmontar: apagar la cámara
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
    
    // Ajustar el canvas a la resolución real del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Extraer la imagen como Blob y navegar a processing
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
    <div className="absolute inset-0 bg-black z-50 flex flex-col overflow-hidden">
      {/* Elementos multimedia ocultos/de fondo */}
      {/* playsInline es vital para que iOS no ponga el video a pantalla completa nativa */}
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

      {/* Header superior */}
      <div className="p-6 flex justify-between items-center text-white mt-8 z-20 relative pt-safe">
        <h2 className="text-2xl font-bold tracking-wide drop-shadow-md">Escanear</h2>
        <button 
          onClick={() => navigate("/home")}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>
      </div>
      
      {/* Marco central del escáner */}
      <div className="flex-1 relative flex items-center justify-center z-10 px-8">
        {/* El truco del shadow gigante para oscurecer el fondo dejando el centro claro */}
        <div className="w-full max-w-[320px] aspect-square border-4 border-primary rounded-3xl z-10 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-primary shadow-[0_0_15px_#1976D2] animate-pulse"></div>
        </div>
      </div>
      
      {/* Controles inferiores */}
      <div className="pb-safe flex flex-col items-center justify-end z-20 relative bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-8">
        <p className="text-white text-xl font-bold mb-8 drop-shadow-md">
          Enfoca el código o nombre
        </p>
        
        <div className="flex items-center justify-between w-full max-w-[340px] px-6">
          {/* Botón de Galería */}
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="flex flex-col items-center gap-1 group w-16"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-active:bg-white/30 transition-colors border border-white/20">
              <span className="material-symbols-outlined text-2xl">photo_library</span>
            </div>
            <span className="text-xs font-medium text-white/90">Fotos</span>
          </button>

          {/* Botón de Captura */}
          <button 
            onClick={handleCapture} 
            className="w-[84px] h-[84px] bg-white rounded-full border-[5px] border-slate-300 active:scale-95 transition-transform"
          ></button>

          {/* Elemento fantasma para centrar perfectamente el botón de captura */}
          <div className="w-16"></div>
        </div>
      </div>
    </div>
  );
}