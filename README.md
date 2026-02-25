<div align="center">
  <img src="frontend/public/logo-weagain-sin-fondo.svg" alt="WeAgain Logo" width="180"/>
  <h1>🏥 MedScan</h1>
  <p><strong>Escanea, entiende y nunca olvides tu medicación.</strong></p>
  <p>Una solución accesible que rompe la brecha digital en la salud para personas mayores y sus cuidadores.</p>

  [<image-card alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" ></image-card>](https://reactjs.org/)
  [<image-card alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" ></image-card>](https://vitejs.dev/)
  [<image-card alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" ></image-card>](https://tailwindcss.com/)
  [<image-card alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" ></image-card>](https://www.typescriptlang.org/)
  [<image-card alt="Flask" src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" ></image-card>](https://flask.palletsprojects.com/)
  [<image-card alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" ></image-card>](https://www.python.org/)
  [<image-card alt="Railway" src="https://img.shields.io/badge/Railway-0B0C0D?style=for-the-badge&logo=railway&logoColor=white" ></image-card>](https://railway.app)
</div>

---

## 📖 Sobre el Proyecto

**MedScan** es una plataforma sociosanitaria integral diseñada para ayudar a personas mayores y sus cuidadores a gestionar la medicación de forma segura, sencilla e independiente.

Gracias a **Visión Artificial (OCR)** e **Inteligencia Artificial Generativa**, el usuario solo tiene que **escanear la caja de cualquier medicamento** con la cámara del móvil. El sistema identifica automáticamente el **Código Nacional de Medicamento (CNM)**, descarga el prospecto oficial de la **AEMPS (base CIMA)** y abre un chat inteligente que responde **únicamente** sobre ese documento, con lenguaje claro, empático y adaptado a personas mayores.

---

## 🎯 Propósito y Público Objetivo

MedScan nace para proteger a la población vulnerable y reducir los errores de medicación, que afectan a más del 50 % de las personas mayores de 65 años.

**Público principal:**
- **Pacientes mayores** (interfaz ultra-sencilla con botones grandes y accesibilidad total)
- **Cuidadores familiares**
- **Profesionales** (residencias de mayores, enfermeros y médicos)

**Modelo de negocio futuro (B2B):**
- Residencias de mayores (gestión centralizada de pastilleros)
- Farmacias y hospitales (valor añadido para pacientes)
- Cuidadores profesionales (dashboard de control remoto)

---

## ✨ Características Principales

### 📱 Frontend (React + Vite)
- **Multi-rol permanente**: Paciente o Cuidador (se elige una sola vez)
- **Interfaz senior-friendly**: botones gigantes, alto contraste, textos grandes
- **Accesibilidad total**: Speech-to-Text y Text-to-Speech integrados
- **Flujo principal paciente**:
  - Pantalla principal con botón gigante **“Escanear medicamento”**
  - Cámara con overlay de escaneo
  - Chat IA con foto del medicamento + resumen del prospecto
  - Lista de medicamentos + alarmas automáticas
- **Dashboard cuidador**:
  - Lista de pacientes con estado de tomas (semáforo verde/rojo)
  - Añadir paciente por ID
  - Gestión completa de medicamentos (nombre, CNM, horarios, frecuencia, foto)

### ⚙️ Backend (Flask)
- OCR integrado con **OCR.space**
- Consulta oficial en tiempo real a **API CIMA (AEMPS)**
- Procesamiento de PDF con **ChatPDF**
- Notificaciones push al cuidador cuando el paciente marca “Ya me la he tomado” o pospone
- API REST limpia y documentada

---

## 🚀 Tecnologías y Herramientas

| Capa          | Tecnología                          | Versión / Uso                              |
|---------------|-------------------------------------|--------------------------------------------|
| Frontend      | React 18 + TypeScript + Vite        | Máximo rendimiento y HMR                   |
| Estilos       | Tailwind CSS + shadcn/ui            | Diseño moderno y accesible                 |
| Router        | React Router DOM                    | Navegación fluida                          |
| Backend       | Python + Flask                      | API ligera y escalable                     |
| Deploy        | Railway (Backend) + Vercel/Netlify  | Frontend (PWA)                             |
| IA / OCR      | OCR.space + ChatPDF + Gemini        | Procesamiento inteligente                  |
| Base datos    | SQLite (demo) / PostgreSQL (prod)   | Almacenamiento de usuarios y relaciones    |

---

## 🔄 Arquitectura y Flujo de Datos

`mermaid
graph TD
    A[Frontend React - Paciente/Cuidador] -->|Foto o CNM| B[Flask Backend /upload o /upload-by-cn]
    B --> C[OCR.space API]
    C --> D[API CIMA AEMPS]
    D --> E[Descarga Prospecto PDF]
    E --> F[ChatPDF API - Vector Store]
    A -->|Pregunta por voz o texto| G[Flask /pregunta]
    G --> F
    F -->|Respuesta simplificada| A
    A -->|Alarma "Ya tomada"| H[Notificación push al Cuidador]

🔌 API Reference (Backend)
La API está desplegada en producción: https://medscan-production.up.railway.app



































MétodoEndpointDescripciónPOST/uploadSube foto → OCR → CIMA → prepara chatPOST/upload-by-cn/:cnUsa CNM directamente (sin foto)GET/preguntaEnvía pregunta sobre el prospecto actualGET/medicamento/:cnDevuelve nombre, foto oficial y datos básicosPOST/toma-registradaRegistra toma y notifica al cuidador
Ejemplo de respuesta /pregunta:
JSON{
  "pregunta": "¿Debo tomarlo con comida?",
  "respuesta": "Sí, es recomendable tomar el ibuprofeno junto con las comidas o con un vaso de leche para proteger el estómago.",
  "fuente": "Prospecto oficial AEMPS"
}

🛠️ Instalación y Despliegue Local
1. Clonar el repositorio
Bashgit clone https://github.com/gontugithub/medscan.git
cd medscan
2. Backend
Bashcd backend
python -m venv venv
.\venv\Scripts\activate          # Windows
pip install -r requirements.txt

# Crear .env
copy .env.example .env
# Edita .env con tus claves: OCR_API_KEY, CHATPDF_API_KEY, SECRET_KEY, etc.

python app.py
# → Servidor en http://localhost:5000
3. Frontend
Bashcd ../frontend
npm install
npm run dev
# → App en http://localhost:5173

📸 Capturas de Pantalla
(Se añadirán tras generar con Stitch)

Landing + Login/Registro
Selección de rol
Home paciente con botón gigante de escaneo
Cámara + Chat IA
Dashboard cuidador
Alarma fullscreen con foto del medicamento


🔮 Roadmap

 MVP con escaneo + chat + alarmas (Hackathon)
 Notificaciones push reales (Firebase)
 Integración IoT con pastilleros automáticos
 Historial clínico y detección de interacciones
 Versión para residencias (multi-paciente avanzado)
 Soporte multilingüe automático


👥 Equipo
WeAgain – Equipo de desarrollo para hackathon
Desarrollado con ❤️ y mucho café en 48 horas.

📄 Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo libremente para fines educativos y comerciales.


  Construido con ❤️ por WeAgain para un futuro más saludable y accesible.
  ¡Gracias por revisar MedScan!

