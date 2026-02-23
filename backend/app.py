from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# Permitir llamadas desde React / Postman / móvil
CORS(app)

# Importar y registrar las rutas
from src.routes.scan import scan_bp
app.register_blueprint(scan_bp)

if __name__ == '__main__':
    print(" MediScan Backend (versión limpia y dividida)")
    print("   → http://localhost:5000")
    print("   → POST /upload")
    print("   → GET  /pregunta?pregunta=¿Qué dosis tomar?")
    app.run(debug=True, port=5000)