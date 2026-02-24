import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import BackButton from '../components/BackButton';
import MedScanLogo from '../components/MedScan_Logo.jsx';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const nombreMedicamento = location.state?.nombreMedicamento || 'el medicamento';
  const fotoUrl = location.state?.fotoUrl || null;

  const [messages, setMessages] = useState([
    { 
      text: `Hola Paca. Soy MedScan IA. He analizado el prospecto oficial de ${nombreMedicamento}. ¿Qué duda tienes sobre cómo tomarlo, efectos secundarios o contraindicaciones?`, 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const [speakingIndex, setSpeakingIndex] = useState(null);
  
  const messagesEndRef = useRef(null);
  const silenceTimerRef = useRef(null); // Para controlar los 5 segundos de espera

  // --- LÓGICA DE RECONOCIMIENTO DE VOZ ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useRef(null);

  if (SpeechRecognition && !recognition.current) {
    recognition.current = new SpeechRecognition();
    recognition.current.lang = 'es-ES';
    recognition.current.continuous = true; // No para al detectar una pausa breve
    recognition.current.interimResults = true;

    recognition.current.onresult = (event) => {
      // Si detecta voz, reiniciamos el cronómetro de 5 segundos
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setInput(transcript);

      // Iniciamos espera de 5 segundos de silencio antes de parar
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, 5000);
    };

    recognition.current.onerror = () => stopListening();
    recognition.current.onend = () => setIsListening(false);
  }

  const stopListening = () => {
    if (recognition.current) recognition.current.stop();
    setIsListening(false);
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
  };

  const toggleListen = () => {
    if (!recognition.current) return alert("Tu navegador no soporta dictado por voz.");
    if (isListening) {
      stopListening();
    } else {
      setIsListening(true);
      setInput(''); 
      recognition.current.start();
      
      // Temporizador de seguridad inicial (5s)
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, 5000);
    }
  };

  // --- FUNCIÓN DE LECTURA (Voz Masculina) ---
  const toggleLeerEnVozAlta = (texto, index) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const lectura = new SpeechSynthesisUtterance(texto);
    lectura.lang = 'es-ES'; 
    lectura.rate = 1.0;       
    
    const voices = window.speechSynthesis.getVoices();
    const spanishVoices = voices.filter(v => v.lang.includes('es'));
    
    // Buscamos voces masculinas comunes en navegadores
    const maleVoice = spanishVoices.find(v => 
      v.name.toLowerCase().includes('male') || 
      v.name.toLowerCase().includes('jorge') || 
      v.name.toLowerCase().includes('pablo') ||
      v.name.toLowerCase().includes('google español')
    );

    if (maleVoice) lectura.voice = maleVoice;

    lectura.onstart = () => setSpeakingIndex(index);
    lectura.onend = () => setSpeakingIndex(null);
    lectura.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(lectura);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const preguntaUsuario = input.trim();
    
    setMessages(prev => [...prev, { text: preguntaUsuario, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const promptConLimite = `${preguntaUsuario}\n\n(Instrucción para la IA: Responde de forma muy clara, pensada para una persona mayor, y NUNCA superes las 60 palabras de longitud.)`;
      const data = await api.askQuestion(promptConLimite);
      const textoRespuesta = data.respuesta || data.content || data.pregunta || "No he recibido una respuesta válida del servidor.";
      setMessages(prev => [...prev, { text: textoRespuesta, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Lo siento, ha habido un problema de conexión. ¿Puedes intentarlo de nuevo?', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col w-full relative font-display overflow-hidden">
      
      {/* Header (Ancho reducido y Logo implementado) */}
      <header className="bg-white px-5 pt-6 pb-2 shadow-sm z-20 sticky top-0 border-b border-slate-100 flex flex-col gap-2">
        <BackButton />

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0">
            <MedScanLogo className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1775d3] to-green-500">
              MedScan IA
            </h1>
            <p className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1 border border-green-200 truncate max-w-full">
              <span className="material-symbols-outlined text-[12px] shrink-0">check_circle</span> 
              <span className="truncate">Prospecto: {nombreMedicamento}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Área de Chat */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth pb-4 no-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-sm font-bold text-slate-400 mb-1 ml-2 mr-2">
              {msg.sender === 'user' ? 'Tú' : 'MedScan IA'}
            </span>

            <div className={`max-w-[85%] rounded-[20px] shadow-sm flex flex-col overflow-hidden
              ${msg.sender === 'user' 
                ? 'bg-[#1775d3] text-white rounded-tr-sm' 
                : 'bg-white text-[#1f2937] border-2 border-slate-100 rounded-tl-sm'}`}
            >
              {index === 0 && fotoUrl && (
                <div className="w-full bg-slate-100 border-b border-slate-200 p-2">
                  <img src={fotoUrl} alt={nombreMedicamento} className="w-full object-contain max-h-[160px] rounded-lg mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              )}
              
              <div className="p-5 flex flex-col gap-3">
                <span className="text-xl font-medium leading-relaxed">{msg.text}</span>
                {msg.sender === 'bot' && (
                  <button 
                    onClick={() => toggleLeerEnVozAlta(msg.text, index)}
                    className={`mt-2 w-fit flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all px-4 py-2 rounded-xl border shadow-sm ${
                      speakingIndex === index ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-[#1775d3] border-blue-100'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {speakingIndex === index ? 'stop_circle' : 'volume_up'}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {speakingIndex === index ? 'Detener lectura' : 'Escuchar en alto'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start px-2">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 flex gap-2 items-center">
              <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 border-t border-slate-200 sticky bottom-0 z-20 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2 items-center mb-2">
          <button 
            onClick={toggleListen}
            className={`w-[56px] h-[56px] rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-md 
              ${isListening ? 'bg-red-500 text-white animate-pulse border-2 border-red-600' : 'bg-[#eef6fd] text-[#1775d3] border-2 border-blue-100'}`}
          >
            <span className="material-symbols-outlined text-[28px] filled">{isListening ? 'mic' : 'mic'}</span>
          </button>

          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            placeholder={isListening ? "Escuchando voz..." : "Escribe tu duda..."}
            className="flex-1 min-w-0 h-[56px] px-4 bg-slate-100 border-2 border-transparent rounded-2xl text-lg outline-none focus:border-[#1775d3] focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50" 
          />

          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-[56px] h-[56px] bg-[#1775d3] disabled:bg-slate-300 text-white rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-md"
          >
            <span className="material-symbols-outlined text-[28px]">{isLoading ? 'autorenew' : 'send'}</span>
          </button>
        </div>

        {/* Aviso Legal Original Restaurado */}
        <p className="text-[10px] leading-tight text-center text-slate-400 font-medium px-1">
          * Aviso legal: Respuestas generadas por IA según el prospecto. Consulte a un profesional sanitario ante dudas graves.
        </p>
      </footer>
    </div>
  );
};

export default ChatPage;