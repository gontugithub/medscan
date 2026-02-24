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
  
  const messagesEndRef = useRef(null);

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

      setMessages(prev => [...prev, { 
        text: textoRespuesta, 
        sender: 'bot' 
      }]);

    } catch (error) {
      console.error("Error consultando al bot:", error);
      setMessages(prev => [...prev, { 
        text: 'Lo siento, ha habido un problema de conexión al consultar el prospecto. ¿Puedes intentarlo de nuevo?', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f7f8] text-[#1f2937] h-[100dvh] flex flex-col w-full relative font-display">
      
      {/* Cabecera */}
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

            <div className={`max-w-[85%] rounded-[20px] shadow-sm overflow-hidden
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
                {msg.text}
              </p>
            </div>

          </div>
        ))}
        
        {/* Indicador de "Escribiendo..." */}
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
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            placeholder={isLoading ? "Buscando en el prospecto..." : "Escribe tu duda aquí..."}
            className="flex-1 h-[64px] px-6 bg-slate-100 border-2 border-transparent rounded-2xl text-xl outline-none focus:border-[#1775d3] focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50" 
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-[64px] h-[64px] bg-[#1775d3] disabled:bg-slate-300 text-white rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-transform shadow-lg shadow-[#1775d3]/30 disabled:shadow-none"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[32px] animate-spin">autorenew</span>
            ) : (
              <span className="material-symbols-outlined text-[32px]">send</span>
            )}
          </button>
        </div>

        <p className="text-[11px] leading-tight text-center text-slate-400 font-medium px-2">
          * Nota legal: Esta conversación es generada de forma automática por una Inteligencia Artificial (MedScan IA) basada en el prospecto oficial. En caso de duda médica grave, consulte siempre a su médico o farmacéutico.
        </p>
      </footer>
    </div>
  );
};

export default ChatPage;