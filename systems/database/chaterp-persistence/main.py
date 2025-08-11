# systems/database/chaterp-persistence/main.py

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "src"))

from fastapi import FastAPI
from fastapi.responses import JSONResponse, RedirectResponse, HTMLResponse
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from routers.employee_router import router as employee_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="ChatERP Persistence API",
    version="v1",
    description="Documentation de l’API de la database ChatERP",
    docs_url=None,
    redoc_url=None,
)

# Création du dossier photos s’il n'existe pas
os.makedirs("data/photos", exist_ok=True)

# 📂 Exposer les fichiers dans /photos/<filename>
app.mount("/photos", StaticFiles(directory="data/photos"), name="photos")

# 📌 Router des employés
app.include_router(
    employee_router,
    tags=["Employees"],
)

# Alias pour OpenAPI JSON sous /swagger/v1/swagger.json
@app.get("/swagger/v1/swagger.json", include_in_schema=False)
async def swagger_json():
    return JSONResponse(app.openapi())

# Route personnalisée Swagger UI
@app.get("/swagger/index.html", include_in_schema=False)
async def custom_swagger_ui():
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>ChatERP Persistence API – Swagger UI</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
      <link rel="icon" href="https://fastapi.tiangolo.com/img/favicon.png">
      <style>
        body {
          margin: 0;
        }
        .topbar .download-url-wrapper {
          display: none !important; /* Masque le menu Select a definition */
        }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = () => {
          SwaggerUIBundle({
            url: "/swagger/v1/swagger.json",
            dom_id: "#swagger-ui",
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout"
          });
        };
      </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# Redirection /
@app.get("/", include_in_schema=False)
async def root_redirect():
    return RedirectResponse(url="/swagger/index.html")

# Redirection /swagger
@app.get("/swagger", include_in_schema=False)
async def swagger_redirect():
    return RedirectResponse(url="/swagger/index.html")
