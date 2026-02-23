import re
from pypdf import PdfWriter
import os
import requests
from dotenv import load_dotenv

load_dotenv()

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

OCR_API_KEY = os.getenv('OCR_API_KEY')
CHATPDF_API_KEY = os.getenv('CHATPDF_API_KEY')

def ocr_space_ocr(ruta_imagen):
    """OCR con api.ocr.space"""
    url = "https://api.ocr.space/parse/image"
    with open(ruta_imagen, "rb") as f:
        respuesta = requests.post(
            url,
            files={"file": f},
            data={
                "apikey": OCR_API_KEY,
                "language": "spa",
                "isOverlayRequired": False,
                "OCREngine": 2
            }
        )
    if respuesta.status_code == 200:
        resultado = respuesta.json()
        return resultado.get("ParsedResults", [{}])[0].get("ParsedText", "")
    return ""

def extraer_codigo_nacional(texto):
    """Extrae código nacional de 6 dígitos"""
    patrones = [r'\b(\d{6})\b', r'CN[:\s]*(\d{6})', r'CÓDIGO NACIONAL[:\s]*(\d{6})']
    for p in patrones:
        match = re.search(p, texto.upper())
        if match:
            return match.group(1)
    return None

def request_cima(codigo_nacional):
    """Consulta CIMA, descarga Ficha Técnica y Prospecto, y los fusiona"""
    url = f"https://cima.aemps.es/cima/rest/presentacion/{codigo_nacional}"
    respuesta = requests.get(url)
    if respuesta.status_code != 200:
        return None

    datos = respuesta.json()
    
    # 1. Obtener el nombre bruto (primera palabra)
    nombre_raw = datos.get('nombre', 'Medicamento').split()[0]
    
    # 2. LIMPIEZA: Reemplazar caracteres no válidos para nombres de archivo por "_"
    # Esto evita el FileNotFoundError cuando el medicamento tiene una "/" en el nombre
    nombre = re.sub(r'[\\/*?:"<>|]', "_", nombre_raw)

    ficha_url = None
    prospecto_url = None
    
    # Buscar ambos documentos
    for doc in datos.get('docs', []):
        if doc.get('tipo') == 1:  # Ficha Técnica
            ficha_url = doc.get('url')
        elif doc.get('tipo') == 2:  # Prospecto
            prospecto_url = doc.get('url')

    if not ficha_url and not prospecto_url:
        return None  # No hay ningún PDF disponible

    merger = PdfWriter()
    archivos_temporales = []

    # 1. Descargar y añadir Ficha Técnica (si existe)
    if ficha_url:
        ruta_ficha = os.path.join(UPLOAD_FOLDER, f"temp_ficha_{codigo_nacional}.pdf")
        with open(ruta_ficha, "wb") as f:
            f.write(requests.get(ficha_url).content)
        merger.append(ruta_ficha)
        archivos_temporales.append(ruta_ficha)

    # 2. Descargar y añadir Prospecto (si existe)
    if prospecto_url:
        ruta_prospecto = os.path.join(UPLOAD_FOLDER, f"temp_prosp_{codigo_nacional}.pdf")
        with open(ruta_prospecto, "wb") as f:
            f.write(requests.get(prospecto_url).content)
        merger.append(ruta_prospecto)
        archivos_temporales.append(ruta_prospecto)

    # 3. Guardar el PDF combinado
    ruta_combinado = os.path.join(UPLOAD_FOLDER, f"Completo_{nombre}_{codigo_nacional}.pdf")
    merger.write(ruta_combinado)
    merger.close()

    # 4. Limpieza: Borrar los archivos temporales individuales
    for archivo_temp in archivos_temporales:
        if os.path.exists(archivo_temp):
            os.remove(archivo_temp)

    return {"nombre": nombre, "ruta_pdf": ruta_combinado}

def subir_a_chatpdf(ruta_pdf):
    """Sube PDF a ChatPDF"""
    url = "https://api.chatpdf.com/v1/sources/add-file"
    headers = {"x-api-key": CHATPDF_API_KEY}
    nombre = os.path.basename(ruta_pdf)

    with open(ruta_pdf, "rb") as f:
        files = [("file", (nombre, f, "application/pdf"))]
        response = requests.post(url, headers=headers, files=files)

    if response.status_code == 200:
        return response.json().get("sourceId")
    return None

def preguntar_a_pdf(source_id, pregunta):
    """Pregunta al prospecto en ChatPDF"""
    url = "https://api.chatpdf.com/v1/chats/message"
    headers = {
        "x-api-key": CHATPDF_API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "sourceId": source_id,
        "messages": [{"role": "user", "content": f"Responde únicamente usando el PDF: {pregunta}"}]
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get("content")
    return "Error al consultar el prospecto"