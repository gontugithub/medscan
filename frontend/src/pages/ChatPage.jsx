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

  const isEn = navigator.language.startsWith('en');

  const [messages, setMessages] = useState([
    { 
      text: isEn 
        ? `Hello! I am MedScan IA. I have analyzed the leaflet for ${nombreMedicamento}. How can I help you today?`
        : `Hola. Soy MedScan IA. He analizado el prospecto de ${nombreMedicamento}. ¿En qué puedo ayudarte?`, 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const [speakingIndex, setSpeakingIndex] = useState(null);
  
  const messagesEndRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // --- RECONOCIMIENTO DE VOZ ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useRef(null);

  if (SpeechRecognition && !recognition.current) {
    recognition.current = new SpeechRecognition();
    recognition.current.lang = navigator.language || 'es-ES';
    recognition.current.continuous = true; 
    recognition.current.interimResults = true;

    recognition.current.onresult = (event) => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setInput(transcript);
      silenceTimerRef.current = setTimeout(() => stopListening(), 5000);
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
    if (!recognition.current) return alert("Browser not supported / Navegador no compatible");
    if (isListening) {
      stopListening();
    } else {
      setIsListening(true);
      setInput(''); 
      recognition.current.start();
      silenceTimerRef.current = setTimeout(() => stopListening(), 5000);
    }
  };

  // --- LECTURA EN VOZ ALTA ---
  const toggleLeerEnVozAlta = (texto, index) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();
    const lectura = new SpeechSynthesisUtterance(texto);
    const esIngles = /[a-zA-Z]/.test(texto) && (texto.includes(' the ') || texto.includes(' you '));
    lectura.lang = esIngles ? 'en-US' : 'es-ES'; 
    const voices = window.speechSynthesis.getVoices();
    const availableVoices = voices.filter(v => v.lang.includes(esIngles ? 'en' : 'es'));
    const maleVoice = availableVoices.find(v => 
      v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('jorge') || v.name.toLowerCase().includes('david')
    );
    if (maleVoice) lectura.voice = maleVoice;
    lectura.onstart = () => setSpeakingIndex(index);
    lectura.onend = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(lectura);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- ENVÍO DE MENSAJE ---
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const preguntaUsuario = input.trim();
    
    setMessages(prev => [...prev, { text: preguntaUsuario, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const promptMultilenguaje = `
        [SYSTEM ROLE: MEDICAL ASSISTANT & TRANSLATOR]
        1. CONTEXT: You have leaflet info in Spanish.
        2. TASK: Respond to the USER_QUERY.
        3. LANGUAGE: Identify the language of the USER_QUERY and respond ONLY in that language.
        4. MANDATORY: If the question is in English, translate the information and answer in English.
        5. STYLE: Short (max 60 words), clear, for elderly people.
        [USER_QUERY]: ${preguntaUsuario}
      `;
      
      const data = await api.askQuestion(promptMultilenguaje);
      const textoRespuesta = data.respuesta || data.content || data.pregunta || "No response / Sin respuesta.";
      setMessages(prev => [...prev, { text: textoRespuesta, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: isEn ? 'Connection error.' : 'Error de conexión.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col w-full relative font-display overflow-hidden">
      
      {/* Header */}
      <header className="bg-white px-5 pt-6 pb-2 shadow-sm z-20 sticky top-0 border-b border-slate-100 flex flex-col gap-2">
  {/* Lógica condicional para el botón atrás */}
  <BackButton 
    to={location.state?.mode === 'ask' ? '/home' : '/add-patient'} 
    label={location.state?.mode === 'ask' ? 'Volver al inicio' : 'Volver a pacientes'} 
  />
  
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 shrink-0">
      <MedScanLogo className="w-full h-full" />
    </div>
    <div className="flex-1 min-w-0">
      <h1 className="text-lg font-black text-[#1775d3]">MedScan IA</h1>
      <p className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1 border border-green-200 truncate max-w-full">
        <span className="material-symbols-outlined text-[12px] shrink-0">check_circle</span> 
        <span className="truncate">
          {isEn ? 'Leaflet:' : 'Prospecto:'} {nombreMedicamento}
        </span>
      </p>
    </div>
  </div>
</header>
      {/* Chat */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-scrollbar pb-10">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs font-bold text-slate-400 mb-1 px-1">
              {msg.sender === 'user' ? (isEn ? 'You' : 'Tú') : 'MedScan IA'}
            </span>

            {/* ── Burbuja con foto como attachment en el primer mensaje ── */}
            <div className={`max-w-[85%] rounded-[20px] shadow-sm overflow-hidden ${
              msg.sender === 'user'
                ? 'bg-[#1775d3] text-white rounded-tr-sm'
                : 'bg-white border-2 border-slate-100 rounded-tl-sm'
            }`}>
              {index === 0 && fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nombreMedicamento}
                  className="w-full object-contain bg-slate-50 max-h-[200px]"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              )}
              <div className="p-4">
                <span className="text-lg font-medium leading-relaxed">{msg.text}</span>
                {msg.sender === 'bot' && (
                  <button 
                    onClick={() => toggleLeerEnVozAlta(msg.text, index)}
                    className={`mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold uppercase transition-all ${
                      speakingIndex === index
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-blue-50 text-[#1775d3] border-blue-100'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {speakingIndex === index ? 'stop_circle' : 'volume_up'}
                    </span>
                    {speakingIndex === index
                      ? (isEn ? 'Stop' : 'Detener')
                      : (isEn ? 'Listen' : 'Escuchar')}
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 w-fit flex gap-2">
            <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-[#1775d3] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 border-t border-slate-200 sticky bottom-0 pb-safe shadow-lg">
        <div className="flex gap-2 items-center mb-2">
          <button 
            onClick={toggleListen}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#eef6fd] text-[#1775d3]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">{isListening ? 'mic' : 'mic_none'}</span>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isEn ? "Type or speak..." : "Escribe o habla..."}
            className="flex-1 h-14 px-4 bg-slate-100 rounded-2xl outline-none focus:bg-white border-2 border-transparent focus:border-[#1775d3] transition-all" 
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-[#1775d3] text-white rounded-2xl flex items-center justify-center disabled:bg-slate-300"
          >
            <span className="material-symbols-outlined">{isLoading ? 'autorenew' : 'send'}</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400">
          {isEn ? '* AI generated responses based on official leaflet.' : '* Respuestas de IA basadas en el prospecto oficial.'}
        </p>
      </footer>
    </div>
  );
};

export default ChatPage;