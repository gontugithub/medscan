import re
from pypdf import PdfWriter
import os
import requests
from dotenv import load_dotenv
import cv2
import numpy as np
import tempfile



load_dotenv()

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

OCR_API_KEY = os.getenv('OCR_API_KEY')
CHATPDF_API_KEY = os.getenv('CHATPDF_API_KEY')


def aplicar_perspectiva(imagen, pts):
    """Corrige la perspectiva del documento para encuadrarlo"""
    suma = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)
    
    ordenados = np.array([
        pts[np.argmin(suma)],
        pts[np.argmin(diff)],
        pts[np.argmax(suma)],
        pts[np.argmax(diff)],
    ], dtype="float32")
    
    ancho = max(
        np.linalg.norm(ordenados[1] - ordenados[0]),
        np.linalg.norm(ordenados[2] - ordenados[3])
    )
    alto = max(
        np.linalg.norm(ordenados[3] - ordenados[0]),
        np.linalg.norm(ordenados[2] - ordenados[1])
    )
    
    destino = np.array([
        [0, 0], [ancho - 1, 0],
        [ancho - 1, alto - 1], [0, alto - 1]
    ], dtype="float32")
    
    M = cv2.getPerspectiveTransform(ordenados, destino)
    return cv2.warpPerspective(imagen, M, (int(ancho), int(alto)))


def preprocesar_imagen(ruta_imagen):
    """Mejora la imagen con OpenCV y devuelve la ruta de un archivo temporal listo para el OCR"""
    imagen = cv2.imread(ruta_imagen)
    gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
    
    gris_suav = cv2.GaussianBlur(gris, (5, 5), 0)
    bordes = cv2.Canny(gris_suav, 75, 200)
    contornos, _ = cv2.findContours(bordes, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contornos = sorted(contornos, key=cv2.contourArea, reverse=True)
    
    documento = gris
    for contorno in contornos:
        perimetro = cv2.arcLength(contorno, True)
        aproximacion = cv2.approxPolyDP(contorno, 0.02 * perimetro, True)
        if len(aproximacion) == 4:
            pts = aproximacion.reshape(4, 2).astype("float32")
            documento = aplicar_perspectiva(gris, pts)
            break
    
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    mejorado = clahe.apply(documento)
    sin_ruido = cv2.fastNlMeansDenoising(mejorado, h=10)
    binaria = cv2.adaptiveThreshold(
        sin_ruido, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY, 11, 2
    )
    
    # Guardamos en un archivo temporal y devolvemos su ruta
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    cv2.imwrite(tmp.name, binaria)
    tmp.close()
    return tmp.name


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
    """Consulta CIMA, descarga Ficha Técnica y Prospecto, y los fusiona """
    url = f"https://cima.aemps.es/cima/rest/presentacion/{codigo_nacional}"
    respuesta = requests.get(url)
    if respuesta.status_code != 200:
        return None

    datos = respuesta.json()
    nombre = datos.get('nombre', 'Medicamento').split()[0]

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