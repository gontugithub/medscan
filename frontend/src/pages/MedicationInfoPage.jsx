import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationInfoPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button onClick={() => navigate('/scan')} className="text-2xl mr-4">←</button>
        <h1 className="text-xl font-semibold">Paracetamol 1g</h1>
      </header>

      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button 
          onClick={() => setTab('info')}
          className={`flex-1 p-3 ${tab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Información
        </button>
        <button 
          onClick={() => setTab('dosis')}
          className={`flex-1 p-3 ${tab === 'dosis' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Dosis
        </button>
        <button 
          onClick={() => setTab('alarmas')}
          className={`flex-1 p-3 ${tab === 'alarmas' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Alarmas
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === 'info' && (
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3">Información del medicamento</h2>
            <p className="text-gray-600 mb-4">
              El paracetamol es un medicamento utilizado para tratar el dolor y la fiebre.
            </p>
            <div className="space-y-2">
              <p><span className="font-medium">Principio activo:</span> Paracetamol</p>
              <p><span className="font-medium">Presentación:</span> Comprimidos 1g</p>
              <p><span className="font-medium">Laboratorio:</span> Generic</p>
            </div>
          </div>
        )}

        {tab === 'dosis' && (
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3">Dosis recomendada</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-medium">Adultos</p>
                <p className="text-sm text-gray-600">1 comprimido cada 8 horas</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="font-medium">Niños</p>
                <p className="text-sm text-gray-600">Consultar con médico</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'alarmas' && (
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3">Próxima atención</h2>
            <div className="text-center p-4 bg-blue-50 rounded-lg mb-4">
              <p className="text-3xl font-bold text-blue-600">20:30</p>
              <p className="text-gray-600">En 2 horas</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>08:00</span>
                <span className="text-green-600">✓ Tomada</span>
              </div>
              <div className="flex justify-between items-center">
                <span>16:00</span>
                <span className="text-green-600">✓ Tomada</span>
              </div>
              <div className="flex justify-between items-center">
                <span>20:30</span>
                <span className="text-yellow-600">⏳ Pendiente</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón de acción */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold">
          Registrar toma
        </button>
      </div>
    </div>
  );
};

export default MedicationInfoPage;
