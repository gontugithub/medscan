import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate('/')} className="mb-4 text-2xl">←</button>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Bienvenido de nuevo</h1>
        <p className="text-center text-gray-600 mb-8">Inicia sesión para continuar</p>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email o nombre de usuario</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@domain.com"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-3">
            Entrar
          </button>

          <p className="text-center text-gray-600">
            ¿No tienes cuenta? <button onClick={() => navigate('/register')} className="text-blue-600 font-semibold">Regístrate</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;