import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Ingresa un correo válido.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = () => {
    if (!emailError && email) {
      // Aquí iría tu llamada al backend
      console.log("Enviar email de recuperación a:", email);
      setIsSubmitted(true);
    }
  };

  const isFormValid = email && !emailError;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      
      <button 
        onClick={() => navigate(-1)} 
        className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full mb-8 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">
          arrow_back
        </span>
      </button>

      <h2 className="text-3xl font-bold mb-4 text-text-main">
        Recuperar contraseña
      </h2>

      <p className="text-lg text-slate-600 mb-8">
        Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
      </p>

      {!isSubmitted ? (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="ejemplo@correo.com"
              className={`w-full h-16 px-4 rounded-2xl border-2 focus:ring-0 text-lg bg-white outline-none transition-colors ${
                emailError
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-200 focus:border-primary'
              }`}
            />

            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full h-16 text-white text-xl font-bold rounded-2xl shadow-lg mt-4 transition-all ${
              isFormValid
                ? 'bg-primary active:scale-95 hover:bg-opacity-90 cursor-pointer'
                : 'bg-slate-300 cursor-not-allowed opacity-70'
            }`}
          >
            Enviar instrucciones
          </button>
        </div>
      ) : (
        <div className="bg-slate-100 p-6 rounded-2xl text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">
            mark_email_read
          </span>
          <p className="text-lg text-slate-700">
            Si el correo está registrado, recibirás un email con los pasos para restablecer tu contraseña.
          </p>
        </div>
      )}
    </div>
  );
}