import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  
  // Estados para los campos, errores y visibilidad de contraseña
  const [identifier, setIdentifier] = useState(''); // Puede ser email o usuario
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validación de Email o Usuario
  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    setIdentifier(value);

    if (!value) {
      setIdentifierError('');
    } else if (value.includes('@')) {
      // Regex básico para validar estructura de email (ejemplo@correo.com)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setIdentifierError('Ingresa un correo válido.');
      } else {
        setIdentifierError('');
      }
    } else {
      // Validación básica para nombre de usuario (mínimo 3 caracteres)
      if (value.length < 3) {
        setIdentifierError('El usuario debe tener al menos 3 caracteres.');
      } else {
        setIdentifierError('');
      }
    }
  };

  // Validación de Contraseña
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Regex: Mínimo 8 caracteres, al menos 1 letra mayúscula, 1 minúscula y 1 número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    
    if (!value) {
      setPasswordError('');
    } else if (!passwordRegex.test(value)) {
      setPasswordError('Debe tener mín. 8 caracteres, una mayúscula, una minúscula y un número.');
    } else {
      setPasswordError('');
    }
  };

  // Comprueba si el formulario es válido para habilitar el botón
  const isFormValid = identifier && password && !identifierError && !passwordError;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-8 active:scale-95">
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
      
      <h2 className="text-3xl font-bold mb-8 text-text-main">Bienvenido de nuevo</h2>
      
      <div className="space-y-6">
        {/* Campo Email/Usuario */}
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Email o nombre de usuario</label>
          <input 
            type="text" 
            value={identifier}
            onChange={handleIdentifierChange}
            className={`w-full h-16 px-4 rounded-2xl border-2 focus:ring-0 text-lg bg-white outline-none transition-colors ${identifierError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'}`} 
            placeholder="ejemplo@correo.com" 
          />
          {identifierError && <p className="text-red-500 text-sm mt-1">{identifierError}</p>}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-lg font-medium text-slate-700 mb-2">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={handlePasswordChange}
              className={`w-full h-16 px-4 rounded-2xl border-2 focus:ring-0 text-lg bg-white outline-none transition-colors ${passwordError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'}`} 
              placeholder="******" 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="text-right">
          <span className="text-primary font-medium text-lg cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
        </div>

        {/* Botón Entrar */}
        <button 
          onClick={() => navigate('/role')} 
          disabled={!isFormValid}
          className={`w-full h-16 text-white text-xl font-bold rounded-2xl shadow-lg mt-4 transition-all ${
            isFormValid 
              ? 'bg-primary active:scale-95 hover:bg-opacity-90 cursor-pointer' 
              : 'bg-slate-300 cursor-not-allowed opacity-70'
          }`}
        >
          Entrar
        </button>

        <p className="text-center text-lg text-slate-600 mt-6">
          ¿No tienes cuenta? <span onClick={() => navigate('/register')} className="text-primary font-bold cursor-pointer hover:underline">Regístrate</span>
        </p>
      </div>
    </div>
  );
}