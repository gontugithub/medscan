import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

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
  const [isListening, setIsListening] = useState(false); // Estado para el micrófono
  
  const messagesEndRef = useRef(null);

  // --- LÓGICA DE RECONOCIMIENTO DE VOZ (Dictado) ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  }

  const toggleListen = () => {
    if (!recognition) return alert("Tu navegador no soporta dictado por voz.");
    if (isListening) {
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  // --- FUNCIÓN DE LECTURA ---
  const leerEnVozAlta = (texto) => {
    window.speechSynthesis.cancel();
    const lectura = new SpeechSynthesisUtterance(texto);
    lectura.lang = 'es-ES'; 
    lectura.rate = 1;       
    window.speechSynthesis.speak(lectura);
  };

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
      const data = await api.askQuestion(preguntaUsuario);
      const textoRespuesta = data.respuesta || data.content || data.pregunta || "No he recibido una respuesta válida del servidor.";
      setMessages(prev => [...prev, { text: textoRespuesta, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Lo siento, ha habido un problema. ¿Puedes intentarlo de nuevo?', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col w-full relative font-display">
      
      <header className="bg-white px-5 pt-10 pb-4 shadow-sm z-20 sticky top-0 border-b border-slate-100 flex flex-col gap-4">
        <button 
          onClick={() => navigate('/home')} 
          className="flex items-center gap-2 text-[#1775d3] font-bold text-lg bg-[#1775d3]/10 w-fit px-5 py-3 rounded-xl active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          Volver al inicio
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#1775d3] rounded-full flex items-center justify-center text-white shadow-md shrink-0 border-4 border-[#1775d3]/20">
            <span className="material-symbols-outlined text-[32px]">smart_toy</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1775d3] to-green-500 pb-1">
              MedScan IA
            </h1>
            <p className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md inline-flex items-center gap-1 mt-1 border border-green-200">
              <span className="material-symbols-outlined text-[16px]">check_circle</span> Prospecto: {nombreMedicamento}
            </p>
          </div>
        </div>
      </header>

      {/* Área de Chat */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth pb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            
            <span className="text-sm font-bold text-slate-400 mb-1 ml-2 mr-2">
              {msg.sender === 'user' ? 'Tú' : 'MedScan IA'}
            </span>

            <div className={`p-5 max-w-[85%] rounded-[20px] shadow-sm text-xl font-medium leading-relaxed flex flex-col
              ${msg.sender === 'user' 
                ? 'bg-[#1775d3] text-white rounded-tr-sm' 
                : 'bg-white text-[#1f2937] border-2 border-slate-100 rounded-tl-sm'}`}
            >
              {/* Foto dentro de la burbuja, solo en el primer mensaje del bot */}
              {index === 0 && fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nombreMedicamento}
                  className="w-full object-contain bg-slate-50 max-h-[220px]"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              )}
              <p className="p-5 text-xl font-medium leading-relaxed">
                <span>{msg.text}</span>
              {msg.sender === 'bot' && (
                <button 
                  onClick={() => leerEnVozAlta(msg.text)}
                  className="mt-3 flex items-center self-start text-[#1775d3] hover:opacity-70 transition-opacity bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
                >
                  <span className="material-symbols-outlined text-lg">volume_up</span>
                  <span className="text-[12px] ml-1 font-bold uppercase tracking-wider">Escuchar</span>
                </button>
              )}
              </p>
            </div>

          </div>
        ))}
        
        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold text-slate-400 mb-1 ml-2">MedScan IA</span>
            <div className="bg-white p-5 max-w-[85%] rounded-[20px] rounded-tl-sm shadow-sm border-2 border-slate-100 flex gap-2 items-center h-[68px]">
              <div className="w-3 h-3 bg-[#1775d3] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#1775d3] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-[#1775d3] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Footer */}
      <footer className="bg-white p-5 border-t border-slate-200 sticky bottom-0 z-20 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 items-center mb-3">
          
          {/* BOTÓN DE DICTADO (Micro) */}
          <button 
            onClick={toggleListen}
            className={`w-[64px] h-[64px] rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-lg 
              ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-500 text-white'}`}
          >
            <span className="material-symbols-outlined text-[32px]">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>

          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            placeholder={isListening ? "Escuchando..." : "Escribe tu duda..."}
            className="flex-1 h-[64px] px-6 bg-slate-100 border-2 border-transparent rounded-2xl text-xl outline-none focus:border-[#1775d3] focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50" 
          />

          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-[64px] h-[64px] bg-[#1775d3] disabled:bg-slate-300 text-white rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-lg shadow-[#1775d3]/30"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[32px] animate-spin">autorenew</span>
            ) : (
              <span className="material-symbols-outlined text-[32px]">send</span>
            )}
          </button>
        </div>

        <p className="text-[11px] leading-tight text-center text-slate-400 font-medium px-2">
          * Respuestas generadas por IA según el prospecto. Consulte a un profesional sanitario ante dudas graves.
        </p>
      </footer>
    </div>
  );
};

export default ChatPage;