from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://medscanweagain.vercel.app"
])

# Importar y registrar las rutas
from src.routes.scan import scan_bp
app.register_blueprint(scan_bp)

if __name__ == '__main__':
    print(" MediScan Backend (versión limpia y dividida)")
    print("   → http://localhost:5000")
    print("   → POST /upload")
    print("   → GET  /pregunta?pregunta=¿Qué dosis tomar?")
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))