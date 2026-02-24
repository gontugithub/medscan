import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recuperamos el nombre del medicamento que pasamos desde el ProcessingPage
  // Si por lo que sea recargan la página directamente aquí, ponemos un fallback
  const nombreMedicamento = location.state?.nombreMedicamento || 'el medicamento';

  const [messages, setMessages] = useState([
    { text: `Hola, he analizado el documento de ${nombreMedicamento}. ¿Qué necesitas saber sobre cómo tomarlo, efectos secundarios o contraindicaciones?`, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencia para hacer scroll automático al final de los mensajes
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
    
    // 1. Añadimos la pregunta del usuario a la pantalla
    setMessages(prev => [...prev, { text: preguntaUsuario, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Llamamos a tu backend mediante el servicio centralizado
      const data = await api.askQuestion(preguntaUsuario);
      
      // 3. Añadimos la respuesta del bot. 
      // (Asumo que el backend devuelve {"respuesta": "..."} basándome en cómo empezaba tu JSON truncado)
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        {/* Aquí tenías un botón vacío, le he puesto el icono de volver (flecha) */}
        <button onClick={() => navigate("/camera")} className="text-2xl mr-4 text-gray-600 hover:text-gray-900">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-semibold">ASISTENTE IA PERSONAL</h1>
          <p className="text-sm text-gray-500 text-left">IA - CIMA Salud</p>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${
              msg.sender === 'user' 
                ? 'bg-[#1775d3] text-white rounded-br-none' // Puse tu color primary
                : 'bg-white shadow rounded-bl-none text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Indicador de "Escribiendo..." */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow rounded-xl rounded-bl-none p-4 flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        {/* Ancla invisible para el auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Analizando documento..." : "Escribe tu pregunta..."}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1775d3]/50 disabled:bg-gray-100"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-[#1775d3] hover:bg-[#125ea8] text-white px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin">autorenew</span>
            ) : (
              'Enviar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;