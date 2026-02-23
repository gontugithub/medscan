import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Hola, Paca</h1>
        <button className="text-2xl">🔍</button>
      </header>

      <div className="p-4">
        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => navigate('/scan')}
            className="bg-blue-600 text-white p-6 rounded-xl flex flex-col items-center"
          >
            <span className="text-3xl mb-2">📷</span>
            <span>Escanear</span>
          </button>
          <button 
            onClick={() => navigate('/medications')}
            className="bg-green-600 text-white p-6 rounded-xl flex flex-col items-center"
          >
            <span className="text-3xl mb-2">💊</span>
            <span>Descargar medicamentos</span>
          </button>
        </div>

        {/* Mis medicamentos */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">Mis medicamentos</h2>
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="font-medium">Tarea 2 tomas parciales</p>
            <p className="text-sm text-gray-500">extra tolas · Hoy</p>
          </div>
        </div>

        {/* Botones de ayuda */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-200 p-4 rounded-xl font-medium">
            🆘 Ayuda
          </button>
          <button className="bg-gray-200 p-4 rounded-xl font-medium">
            👨‍⚕️ Contactar Médico
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3">
        <button className="text-blue-600">🏠</button>
        <button onClick={() => navigate('/calendar')}>📅</button>
        <button onClick={() => navigate('/chat')}>💬</button>
        <button>👤</button>
      </nav>
    </div>
  );
};

export default PatientHomePage;