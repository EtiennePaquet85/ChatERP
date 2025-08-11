# systems/database/chaterp-persistence/Dockerfile

FROM python:3.11-slim

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers
COPY . .

# Crée le dossier de stockage pour les photos (important pour conteneur)
RUN mkdir -p /app/data/photos

# Installer toutes les dépendances (runtime + dev)
RUN pip install --no-cache-dir -r requirements.txt

# Vérification du format, lint et typage
RUN black --check src && flake8 src && mypy src

# Exposer le port (par défaut FastAPI via uvicorn)
EXPOSE 80

# Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
