import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CIMA Salud</h1>
        <select className="p-2 border rounded-lg">
          <option>Elige tu rol</option>
          <option>Paciente</option>
          <option>Familiar</option>
          <option>Médico</option>
        </select>
      </header>

      {/* Hero */}
      <div className="px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Nos ve puede cambiar este celular</h2>
        <p className="text-gray-600 mb-6">Tu salud en un click</p>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-4">Bienvenido de nuevo</h3>
          <input 
            type="email" 
            placeholder="ejemplo@domain.com" 
            className="w-full p-3 border rounded-lg mb-3"
          />
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-2"
          >
            Entrar
          </button>
          <p className="text-center text-gray-600">
            ¿No tienes cuenta? <button onClick={() => navigate('/register')} className="text-blue-600 font-semibold">Regístrate</button>
          </p>
        </div>

        {/* Contacto */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">¿Quieres recibir más información?</p>
          <a href="#" className="text-blue-600 font-semibold">Contacto aquí</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;