import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MedScanLogo from '../components/MedScan_Logo.jsx';

export default function CameraPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [streamActive, setStreamActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

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

  const handleGallerySelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      navigate('/processing', { state: { foto: file } });
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col font-display overflow-hidden h-[100dvh]">
      
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

      {/* Header Superior con TU LOGO */}
      <div className="p-6 flex justify-between items-center text-white mt-4 z-20 relative pt-safe bg-gradient-to-b from-black/80 to-transparent pb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <MedScanLogo className="w-full h-full shadow-lg" />
          </div>
          <h2 className="text-2xl font-black tracking-wide drop-shadow-lg">
            MedScan
          </h2>
        </div>
        
        <button 
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white hover:bg-black/60 active:scale-95 border border-white/20 shadow-xl transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
          <span className="font-bold text-lg">Cancelar</span>
        </button>
      </div>
      
      {/* Marco central del escáner */}
      <div className="flex-1 relative flex flex-col items-center justify-center z-10 px-8">
        
       {/* Botón de Ayuda (Tamaño equilibrado y color vibrante) */}
<button 
  onClick={() => setShowInstructions(true)}
  className="mb-8 flex items-center gap-2 bg-[#1775d3] text-white px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(23,117,211,0.5)] border-2 border-white/30 active:scale-95 transition-all hover:bg-[#1d88f5] z-30"
>
  <span className="material-symbols-outlined text-[24px] !fill-1">help</span>
  <span className="text-base font-bold tracking-tight">¿Cómo hacer la foto?</span>
</button>

        {/* Cuadro del escáner */}
        <div className="w-full max-w-[320px] aspect-square border-[6px] border-[#1775d3] rounded-[2.5rem] z-10 shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 w-full h-[3px] bg-white shadow-[0_0_25px_#ffffff] animate-[scan_2.5s_ease-in-out_infinite]"></div>
          <span className="material-symbols-outlined text-[110px] text-white opacity-20">barcode_scanner</span>
        </div>

        {/* Instrucción corta */}
        <div className="mt-10 bg-[#1775d3]/20 backdrop-blur-md px-7 py-4 rounded-2xl border border-white/20 text-center mx-4 shadow-2xl">
          <p className="text-white text-xl font-bold flex items-center gap-3 justify-center">
            <span className="material-symbols-outlined text-[#3da1ff] text-2xl">center_focus_strong</span>
            Enfoca el código de la caja
          </p>
        </div>
      </div>
      
      {/* Controles Inferiores */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-32 pb-12 px-8 flex justify-center items-end gap-12 z-30">
        
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="flex flex-col items-center gap-3 active:scale-95 transition-transform pb-2"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white backdrop-blur-md shadow-lg hover:bg-white/20">
            <span className="material-symbols-outlined text-[32px]">photo_library</span>
          </div>
          <span className="text-white/80 font-bold text-base drop-shadow-md">Galería</span>
        </button>

        <button 
          onClick={handleCapture} 
          className="flex flex-col items-center gap-3 active:scale-90 transition-all"
        >
          <div className="w-[105px] h-[105px] bg-white rounded-full border-[10px] border-[#1775d3] flex items-center justify-center shadow-[0_0_40px_rgba(23,117,211,0.7)]">
             <div className="w-full h-full flex items-center justify-center bg-transparent rounded-full border-4 border-slate-200">
                <span className="material-symbols-outlined text-[52px] text-[#1775d3]">photo_camera</span>
             </div>
          </div>
          <span className="text-white font-black text-xl tracking-wide drop-shadow-md">HACER FOTO</span>
        </button>

        <div className="w-16 h-16 opacity-0 pointer-events-none"></div>
      </div>

      {/* Ventana de Instrucciones Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl border border-white/20">
            <div className="w-24 h-24 bg-[#1775d3]/10 text-[#1775d3] rounded-full flex items-center justify-center mb-6 border-4 border-[#1775d3]/20">
              <span className="material-symbols-outlined text-[50px]">contactless</span>
            </div>
            
            <h3 className="text-3xl font-black text-slate-800 mb-6 tracking-tight leading-tight">Para un mejor escaneo</h3>
            
            <div className="space-y-4 text-left w-full mb-8">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="material-symbols-outlined text-[#1775d3] text-3xl font-bold">qr_code_2</span>
                <p className="text-lg text-slate-700 font-bold leading-tight">Enfoca el <strong>código de barras</strong></p>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="material-symbols-outlined text-[#1775d3] text-3xl font-bold">lightbulb</span>
                <p className="text-lg text-slate-700 font-bold leading-tight">Busca un lugar con <strong>mucha luz</strong></p>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="material-symbols-outlined text-[#1775d3] text-3xl font-bold">vibration</span>
                <p className="text-lg text-slate-700 font-bold leading-tight">Mantén el pulso <strong>firme</strong></p>
              </div>
            </div>

            <button 
              onClick={() => setShowInstructions(false)}
              className="w-full h-[75px] bg-[#1775d3] text-white text-2xl font-black rounded-3xl shadow-[0_10px_25px_rgba(23,117,211,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
              ¡ENTENDIDO!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}