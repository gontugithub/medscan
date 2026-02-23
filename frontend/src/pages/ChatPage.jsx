import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: 'Hola, soy tu asistente médico. ¿En qué puedo ayudarte?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Estoy analizando tu pregunta. ¿Podrías darme más detalles?', 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button onClick={() => navigate('/patient')} className="text-2xl mr-4"></button>
        <div>
          <h1 className="text-xl font-semibold">Asistente Médico</h1>
          <p className="text-sm text-gray-500">IA - CIMA Salud</p>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white shadow rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 border rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-lg font-semibold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
