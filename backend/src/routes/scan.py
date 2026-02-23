from flask import Blueprint, request, jsonify, session
from src.services.scan_service import (
    ocr_space_ocr,
    extraer_codigo_nacional,
    request_cima,
    subir_a_chatpdf,
    preguntar_a_pdf
)
import os

scan_bp = Blueprint('scan', __name__)

@scan_bp.route('/upload', methods=['POST'])
def upload_image():
    if 'foto' not in request.files:
        return jsonify({"error": "No se envió ninguna foto"}), 400

    archivo = request.files['foto']
    if archivo.filename == '':
        return jsonify({"error": "Archivo vacío"}), 400

    ruta = os.path.join('uploads', archivo.filename)
    archivo.save(ruta)

    texto = ocr_space_ocr(ruta)
    cn = extraer_codigo_nacional(texto)

    if not cn:
        return jsonify({"error": "No se encontró código nacional"}), 400

    info = request_cima(cn)
    if not info:
        return jsonify({"error": "Medicamento no encontrado en CIMA"}), 404

    source_id = subir_a_chatpdf(info['ruta_pdf'])
    if not source_id:
        return jsonify({"error": "Error al subir a ChatPDF"}), 500

    session['source_id'] = source_id

    return jsonify({
        "mensaje": "✅ Escaneo completado",
        "nombre_medicamento": info['nombre'],
        "source_id": source_id
    }), 200


@scan_bp.route('/pregunta', methods=['GET'])
def hacer_pregunta():
    source_id = session.get('source_id')
    if not source_id:
        return jsonify({"error": "Primero haz /upload"}), 400

    pregunta = request.args.get('pregunta')
    if not pregunta:
        return jsonify({"error": "Falta ?pregunta=..."}), 400

    respuesta = preguntar_a_pdf(source_id, pregunta)

    return jsonify({
        "pregunta": pregunta,
        "respuesta": respuesta
    }), 200