import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    password: ''
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate('/')} className="mb-4 text-2xl">←</button>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Crear tu cuenta</h1>
        <p className="text-center text-gray-600 mb-8">Regístrate para usar MedScan</p>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-gray-700 mb-1">Nombre</label>
              <input
                placeholder="Mario"
                className="w-full p-3 border rounded-lg"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Apellidos</label>
              <input
                placeholder="García López"
                className="w-full p-3 border rounded-lg"
                value={formData.apellidos}
                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplos@domain.com"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 mb-1">Teléfono móvil</label>
            <input
              type="tel"
              placeholder="800 000 000"
              className="w-full p-3 border rounded-lg"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-3">
            Registrarse
          </button>

          <p className="text-center text-gray-600">
            ¿Ya tienes cuenta? <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold">Inicia sesión</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;