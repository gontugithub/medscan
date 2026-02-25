import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api.js';
import BackButtonn from '../components/BackButtonn';
import MedScanLogo from '../components/MedScan_Logo.jsx';

const ChatPageMedico = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const nombreMedicamento = location.state?.nombreMedicamento || 'el medicamento';
  const fotoUrl = location.state?.fotoUrl || null;

  const isEn = navigator.language.startsWith('en');

  const [messages, setMessages] = useState([
    { 
      text: isEn 
        ? `Hello Doctor/Caregiver! I am MedScan IA. Leaflet analyzed: ${nombreMedicamento}.`
        : `Hola. Soy MedScan IA. He analizado el prospecto de ${nombreMedicamento} para su paciente.`, 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const [speakingIndex, setSpeakingIndex] = useState(null);
  
  const messagesEndRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // --- RECONOCIMIENTO DE VOZ (TU CÓDIGO) ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useRef(null);

  if (SpeechRecognition && !recognition.current) {
    recognition.current = new SpeechRecognition();
    recognition.current.lang = navigator.language || 'es-ES';
    recognition.current.continuous = true; 
    recognition.current.interimResults = true;
    recognition.current.onresult = (event) => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
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
    if (!recognition.current) return alert("Navegador no compatible");
    if (isListening) stopListening();
    else { setIsListening(true); setInput(''); recognition.current.start(); silenceTimerRef.current = setTimeout(() => stopListening(), 5000); }
  };

  const toggleLeerEnVozAlta = (texto, index) => {
    if (speakingIndex === index) { window.speechSynthesis.cancel(); setSpeakingIndex(null); return; }
    window.speechSynthesis.cancel();
    const lectura = new SpeechSynthesisUtterance(texto);
    lectura.lang = /[a-zA-Z]/.test(texto) && (texto.includes(' the ')) ? 'en-US' : 'es-ES'; 
    lectura.onstart = () => setSpeakingIndex(index);
    lectura.onend = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(lectura);
  };

  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current); };
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const preguntaUsuario = input.trim();
    setMessages(prev => [...prev, { text: preguntaUsuario, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    try {
      const data = await api.askQuestion(`[MEDICAL CONTEXT] ${preguntaUsuario}`);
      setMessages(prev => [...prev, { text: data.respuesta || "Sin respuesta.", sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Error de conexión.', sender: 'bot' }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col w-full relative font-display overflow-hidden">
     <header className="bg-white px-5 pt-6 pb-2 shadow-sm z-20 sticky top-0 border-b border-slate-100 flex flex-col gap-2">
  <BackButtonn />

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0"><MedScanLogo className="w-full h-full" /></div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-[#1775d3]">MedScan IA (Médico)</h1>
            <p className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200 truncate max-w-full">
              {nombreMedicamento}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-scrollbar pb-10">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-[20px] shadow-sm overflow-hidden ${msg.sender === 'user' ? 'bg-[#1775d3] text-white rounded-tr-sm' : 'bg-white border-2 border-slate-100 rounded-tl-sm'}`}>
              {index === 0 && fotoUrl && <img src={fotoUrl} className="w-full object-contain bg-slate-50 max-h-[200px]" alt="med" />}
              <div className="p-4"><span className="text-lg font-medium leading-relaxed">{msg.text}</span></div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 border-t border-slate-200 sticky bottom-0 shadow-lg">
        <div className="flex gap-2 items-center">
          <button onClick={toggleListen} className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isListening ? 'bg-red-500 text-white' : 'bg-[#eef6fd] text-[#1775d3]'}`}>
            <span className="material-symbols-outlined">{isListening ? 'mic' : 'mic_none'}</span>
          </button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Escribe o habla..." className="flex-1 h-14 px-4 bg-slate-100 rounded-2xl outline-none" />
          <button onClick={sendMessage} className="w-14 h-14 bg-[#1775d3] text-white rounded-2xl flex items-center justify-center"><span className="material-symbols-outlined">send</span></button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPageMedico;