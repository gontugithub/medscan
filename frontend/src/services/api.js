// src/services/api.js
//const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BASE_URL = '/api';

export const api = {
  uploadImage: async (formData) => {
    try {
      // Petición limpia, sin credentials para evitar el error de CORS en la demo
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Intentamos extraer el mensaje de error del backend si existe
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al procesar la imagen en el servidor');
      }

      // Si es un 200 OK, devolvemos los datos
      return await response.json();
    } catch (error) {
      console.error("API Error en uploadImage:", error);
      throw error;
    }
  },

  askQuestion: async (pregunta) => {
    try {
      const queryParams = new URLSearchParams({ pregunta }).toString();
      const response = await fetch(`${BASE_URL}/pregunta?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        // Sin credentials aquí tampoco
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al obtener respuesta');
      }
      
      return await response.json();
    } catch (error) {
      console.error("API Error en askQuestion:", error);
      throw error;
    }
  },

  getMedicamentoInfo: async (codigoNacional) => {
  const response = await fetch(`${BASE_URL}/medicamento/${codigoNacional}`);
  if (!response.ok) return null; // Si falla, no es crítico
  return await response.json();
    },

  uploadByCn: async (cn) => {
  const response = await fetch(`${BASE_URL}/upload-by-cn/${cn}`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al procesar el medicamento');
  }
  return await response.json();
},
};