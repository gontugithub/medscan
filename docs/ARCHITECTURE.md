
���️ Arquitectura del Sistema - MedScan
MedScan está diseñado utilizando una arquitectura cliente-servidor desacoplada. Prioriza la rapidez de respuesta, la accesibilidad (A11y) y la separación estricta de dominios (Paciente vs. Médico).

��� Diagrama de Flujo Global
Fragmento de código
sequenceDiagram
    participant User as Usuario / Cámara
    participant Front as Frontend (React/Vite)
    participant Back as Backend (Flask)
    participant OCR as OCR.space API
    participant CIMA as API AEMPS (CIMA)
    participant IA as ChatPDF API

    User->>Front: Saca foto a la caja
    Front->>Back: POST /upload (Imagen)
    Back->>OCR: Envía imagen para análisis de texto
    OCR-->>Back: Devuelve texto plano (extrae Código Nacional)
    Back->>CIMA: Solicita PDF del Prospecto + Ficha
    CIMA-->>Back: Devuelve PDFs
    Back->>IA: Sube PDFs fusionados para vectorización
    IA-->>Back: Devuelve source_id
    Back-->>Front: JSON { nombre, source_id, foto_url }
    Front->>User: Muestra Chat Interactivo
��� Frontend (Capa de Presentación)
Desarrollado como una Single Page Application (SPA) enfocada en Mobile-First.

Tecnologías Base: React 18, Vite (para HMR rápido y build optimizado), React Router DOM v6.

Estilos: Tailwind CSS (Última versión) usando clases de utilidad para interfaces adaptativas y accesibles de alto contraste.

Navegación Condicional (Gestión de Roles): El sistema de enrutamiento utiliza el location.state para mantener el contexto del rol del usuario de forma efímera y segura sin saturar el LocalStorage.

mode: 'ask' ➔ Flujo de Paciente (UI simplificada, botones grandes, vuelve a /home).

mode: 'add' ➔ Flujo de Médico/Cuidador (Acceso al dashboard, vuelve a /add-patient).

Accesibilidad (A11y):

Integración nativa de Web Speech API (SpeechRecognition para Input de voz y SpeechSynthesisUtterance para TTS o Text-To-Speech).

⚙️ Backend (Capa de Lógica de Negocio y Orquestación)
Servicio RESTful desarrollado en Python (Flask). Actúa como un proxy inteligente y orquestador de APIs de terceros.

Flujo de Extracción (ETL):

Recepción: Recibe el buffer de imagen desde el frontend.

OCR: Llama a OCR.space. Se aplica una Expresión Regular (Regex) para aislar patrones que coincidan con el Código Nacional (CN) español (6 dígitos).

Data Fetching: Se consulta la API abierta del Gobierno de España (CIMA) para asegurar que los datos médicos son 100% oficiales y actualizados.

Fusión de Documentos: Se usa pypdf para unir la Ficha Técnica y el Prospecto, dando a la IA un contexto clínico completo.

IA y Vectorización: Se envía el documento a ChatPDF, quien devuelve un identificador de contexto (source_id).

Seguridad y Producción:

Uso de variables de entorno (.env) para proteger las API Keys de los servicios de IA y OCR.

Desplegado en Railway usando Gunicorn como servidor WSGI de producción para manejar múltiples peticiones concurrentes.

��� Decisiones de Diseño y Escalabilidad
Microservicios (Terceros): Al delegar el OCR pesado y la vectorización LLM a APIs especializadas, el backend propio se mantiene ultraligero y económico de escalar.

Prompts de Sistema Estrictos: El backend inyecta un System Prompt ("Role: Medical Assistant for Elderly...") de forma invisible para el usuario. Esto evita alucinaciones de la IA y garantiza respuestas menores a 60 palabras, en un tono respetuoso.

Persistencia Híbrida: Actualmente el dashboard médico guarda estados en localStorage para un prototipado rápido y offline-first. En la próxima fase B2B, se migrará a una base de datos PostgreSQL o Firebase/Supabase para sincronización en tiempo real entre cuidadores y pacientes.
