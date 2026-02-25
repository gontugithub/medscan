# ��� Referencia de la API REST - MedScan

Este documento detalla los endpoints disponibles en el backend de MedScan (construido con Flask). La API actúa como puente entre la aplicación cliente, los servicios de OCR, la base de datos oficial de la AEMPS (CIMA) y el motor de Inteligencia Artificial (ChatPDF).

**Base URL (Producción):** `https://medscanweagain.vercel.app/`
**Base URL (Desarrollo):** `http://localhost:5000`

---

## 1. Escaneo por Imagen
### `POST /upload`
Sube una imagen de la caja de un medicamento. El backend extrae el Código Nacional (OCR), descarga el prospecto oficial y lo prepara en el motor de IA.

* **Headers:** `Content-Type: multipart/form-data`
* **Body:**
  * `foto` (File): Archivo de imagen (JPG, PNG).

**Respuesta Exitosa (200 OK):**
```json
{
  "mensaje": "✅ Escaneo completado con éxito",
  "nombre_medicamento": "IBUPROFENO KERN PHARMA 600 mg",
  "source_id": "src_XYZ123ABC",
  "codigo_nacional": "656843"
}
mkdir -p docs

cat << 'EOF' > docs/API_REFERENCE.md
# ��� Referencia de la API REST - MedScan

Este documento detalla los endpoints disponibles en el backend de MedScan (construido con Flask). La API actúa como puente entre la aplicación cliente, los servicios de OCR, la base de datos oficial de la AEMPS (CIMA) y el motor de Inteligencia Artificial (ChatPDF).

**Base URL (Producción):** `https://medscanweagain.vercel.app/`
**Base URL (Desarrollo):** `http://localhost:5000`

---

## 1. Escaneo por Imagen
### `POST /upload`
Sube una imagen de la caja de un medicamento. El backend extrae el Código Nacional (OCR), descarga el prospecto oficial y lo prepara en el motor de IA.

* **Headers:** `Content-Type: multipart/form-data`
* **Body:**
  * `foto` (File): Archivo de imagen (JPG, PNG).

**Respuesta Exitosa (200 OK):**
```json
{
  "mensaje": "✅ Escaneo completado con éxito",
  "nombre_medicamento": "IBUPROFENO KERN PHARMA 600 mg",
  "source_id": "src_XYZ123ABC",
  "codigo_nacional": "656843"
}
Nota: El source_id es vital; debes guardarlo en el frontend para poder hacer preguntas sobre este documento específico en el endpoint /pregunta.

2. Escaneo por Código Nacional (Manual)
POST /upload-by-cn/<codigo_nacional>
Ruta alternativa para cuando el escáner falla o el médico introduce el código manualmente. Omite el paso del OCR y va directo a CIMA y ChatPDF.

Parámetros de URL: * codigo_nacional (String): Código de 6 dígitos del medicamento.

Respuesta Exitosa (200 OK):

JSON
{
  "mensaje": "✅ Listo",
  "nombre_medicamento": "PARACETAMOL CINFA 1G",
  "source_id": "src_987ABCXYZ",
  "codigo_nacional": "603241"
}
3. Consulta a la Inteligencia Artificial (Chat)
GET /pregunta
Realiza una consulta en lenguaje natural sobre el prospecto previamente cargado. El prompt interno obliga a la IA a responder de forma sencilla, corta y apta para personas mayores.

Query Parameters:

pregunta (String): La duda del usuario (ej: "¿Debo tomarlo con comida?").

source_id (String): El ID devuelto por los endpoints de upload.

Respuesta Exitosa (200 OK):

JSON
{
  "pregunta": "¿Debo tomarlo con comida?",
  "respuesta": "Sí, es mejor que lo tome junto con las comidas o con un poco de leche para evitar molestias en el estómago."
}
4. Obtener Información Básica
GET /medicamento/<codigo_nacional>
Consulta rápida y ligera a la API de CIMA para obtener datos visuales del medicamento (ideal para tarjetas del dashboard médico).

Parámetros de URL: * codigo_nacional (String): Código de 6 dígitos.

Respuesta Exitosa (200 OK):

JSON
{
  "codigo_nacional": "656843",
  "nregistro": "51347",
  "nombre": "IBUPROFENO KERN PHARMA 600 mg",
  "foto_url": "[https://cima.aemps.es/cima/fotos/full/materialas/51347/51347_materialas.jpg](https://cima.aemps.es/cima/fotos/full/materialas/51347/51347_materialas.jpg)"
}
