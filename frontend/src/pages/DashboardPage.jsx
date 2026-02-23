import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-blue-600">CIMA Salud</h1>
      </header>

      <div className="p-4">
        {/* Añadir paciente */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Añadir paciente</h2>
          <p className="text-sm text-gray-600 mb-3">
            Introduzca el código único para iniciar un nuevo paciente a la ciudad
          </p>
          <div className="flex gap-2 mb-3">
            <input 
              placeholder="Código único" 
              className="flex-1 p-3 border rounded-lg"
            />
            <button className="bg-blue-600 text-white px-4 rounded-lg">➕</button>
          </div>
          <button className="w-full border border-blue-600 text-blue-600 p-3 rounded-lg">
            Añadir paciente
          </button>
        </div>

        {/* Grid de pacientes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full mb-2"></div>
            <h3 className="font-semibold">Paca López</h3>
            <p className="text-xs text-gray-500">Paciente</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full mb-2"></div>
            <h3 className="font-semibold">María Rodrigo</h3>
            <p className="text-xs text-gray-500">Paciente</p>
          </div>
        </div>

        {/* Artículos */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold mb-3">Artículo General</h2>
          <div className="flex justify-between items-center">
            <span>📄 Información</span>
            <button className="text-blue-600">Ver más →</button>
          </div>
        </div>

        {/* Detalles manuales */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3">Detalles manuales</h2>
          <button 
            onClick={() => navigate('/patient')}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Ver perfil del paciente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
