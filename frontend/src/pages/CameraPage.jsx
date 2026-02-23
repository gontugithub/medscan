import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setScanning(true);
    // Simular escaneo
    setTimeout(() => {
      setScanning(false);
      setResult('Paracetamol 1g');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 flex items-center">
        <button onClick={() => navigate('/patient')} className="text-2xl mr-4">←</button>
        <h1 className="text-lg font-semibold">Escanear medicamento</h1>
      </header>

      {/* Cámara (simulada) */}
      <div className="relative h-64 bg-gray-800 m-4 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-white rounded-lg"></div>
        </div>
        {scanning && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p>Analizando...</p>
          </div>
        )}
      </div>

      {/* Resultado */}
      {result && (
        <div className="bg-white text-black m-4 p-4 rounded-xl">
          <h2 className="font-bold text-xl mb-2">{result}</h2>
          <p className="text-gray-600 mb-3">Medicamento analizado</p>
          <button 
            onClick={() => navigate('/medication-info')}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Ver información
          </button>
        </div>
      )}

      {/* Botón de escaneo */}
      {!result && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={handleScan}
            disabled={scanning}
            className="bg-blue-600 text-white w-16 h-16 rounded-full text-2xl flex items-center justify-center shadow-lg"
          >
            {scanning ? '⋯' : '📷'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
