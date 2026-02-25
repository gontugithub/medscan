@"
<div align="center">
  <h1 style="font-size: 4.5rem; font-weight: 800; margin: 0; line-height: 1;">
    <span style="color: #FF6B00;">We</span><span style="color: #007BFF;">Again</span>
    <span style="font-size: 1.8rem; color: #555; font-weight: 400; vertical-align: middle; margin-left: 12px;">IA</span>
  </h1>
  <h1>🏥 MedScan</h1>
  <p><strong>Escanea. Entiende. Nunca olvides tu medicación.</strong></p>
  <p>Plataforma sociosanitaria accesible que elimina la brecha digital en el manejo de medicamentos para personas mayores y sus cuidadores.</p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
</div>

---

## 📖 Sobre MedScan

**MedScan** es una solución integral diseñada para mejorar la adherencia terapéutica de las personas mayores mediante tecnología accesible.

Con un simple escaneo de la caja del medicamento, el sistema identifica automáticamente el **Código Nacional de Medicamento (CNM)**, consulta la base oficial **CIMA de la AEMPS**, descarga el prospecto y activa un asistente de IA que responde **únicamente** sobre ese documento en lenguaje claro, empático y adaptado a usuarios seniors.

---

## 🎯 Propósito y Público Objetivo

MedScan nace para proteger a la población más vulnerable, reduciendo los errores de medicación que afectan a más del 50 % de las personas mayores de 65 años en España.

**Público principal**
- Pacientes mayores (interfaz ultra-sencilla y accesible)
- Cuidadores familiares
- Profesionales sanitarios y residencias de mayores

**Modelo de escalabilidad B2B**
- Residencias y centros geriátricos
- Farmacias y hospitales
- Plataformas de telemedicina

---

## ✨ Características Principales

### 📱 Frontend (React + Vite)
- Sistema multi-rol permanente (Paciente / Cuidador)
- Interfaz senior-friendly: botones grandes, alto contraste y textos legibles
- Accesibilidad completa: Speech-to-Text y Text-to-Speech nativos
- Flujo paciente: botón gigante de escaneo → cámara → chat IA → alarmas inteligentes
- Dashboard cuidador: lista de pacientes con semáforo de cumplimiento y gestión completa de tratamientos

### ⚙️ Backend (Flask)
- OCR integrado (OCR.space)
- Consulta oficial en tiempo real a API CIMA (AEMPS)
- Procesamiento inteligente de PDF con ChatPDF
- Notificaciones automáticas al cuidador
- API REST limpia y documentada

---

## 🚀 Stack Tecnológico

| Capa          | Tecnología                     | Propósito                              |
|---------------|--------------------------------|----------------------------------------|
| Frontend      | React 18 + TypeScript + Vite   | Rendimiento y experiencia nativa       |
| Estilos       | Tailwind CSS + shadcn/ui       | Diseño moderno y accesible             |
| Router        | React Router DOM               | Navegación fluida                      |
| Backend       | Python + Flask                 | API ligera y escalable                 |
| Despliegue    | Railway (Backend) + Vercel     | Frontend como PWA                      |
| IA / OCR      | OCR.space + ChatPDF | Procesamiento inteligente              |

---

## 🔄 Arquitectura

```mermaid
graph TD
    A[Frontend React] -->|Foto o CNM| B[Flask Backend]
    B --> C[OCR.space]
    C --> D[API CIMA AEMPS]
    D --> E[Prospecto PDF]
    E --> F[ChatPDF Vector Store]
    A -->|Pregunta voz/texto| G[Backend /pregunta]
    G --> F
    F --> A[Respuesta simplificada]
    A -->|Toma registrada| H[Notificación al Cuidador]

🔌 API (Backend en producción)
URL base: https://medscan-production.up.railway.app




MétodoEndpointDescripciónPOST/uploadFoto → OCR → CIMA → prepara chatPOST/upload-by-cn/:cnCNM directo (sin foto)GET/preguntaConsulta sobre el prospectoGET/medicamento/:cnDatos + foto oficialPOST/toma-registradaRegistra toma y notifica cuidador

🛠️ Instalación Local
Bashgit clone https://github.com/gontugithub/medscan.git
cd medscan
Backend
Bashcd backend
pip install -r requirements.txt
copy .env.example .env
python app.py
Frontend
Bashcd ../frontend
npm install
npm run dev

📸 Capturas (próximamente)

Landing y autenticación
Selección de rol
Home paciente con botón principal de escaneo
Cámara + Chat IA
Dashboard cuidador
Alarma fullscreen con foto del medicamento


🔮 Roadmap

 MVP completo – Hackathon febrero 2026
 Notificaciones push (Firebase)
 Integración IoT con pastilleros automáticos
 Detección automática de interacciones medicamentosas
 Versión multi-paciente para residencias
 Soporte multilingüe automático


👥 Equipo
WeAgain
Desarrollado por:

Alejandro
Hugo
Gonzalo
Carlos
Manuel


📄 Licencia
MIT License – Uso libre para fines educativos y comerciales.


  Desarrollado por WeAgain.

"@ | Out-File -FilePath README.md -Encoding utf8
```
