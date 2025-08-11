# systems/database/chaterp-persistence/Makefile

# 📂 Makefile pour chaterp-persistence (FastAPI)
# Pour Windows + Git Bash ou WSL
# Usage :
#   make install   => Installe les dépendances
#   make lint      => Lint le projet avec flake8 et black
#   make build     => Vérifie la syntaxe, le typage et la qualité du code
#   make run       => Lance Uvicorn en mode production
#   make dev       => Lance Uvicorn en mode développement

.PHONY: install lint build run dev

install:
	@echo "[INSTALL] Installation des dependances..."
	pip install -r requirements.txt

lint:
	@echo "[LINT] Formatage du code avec black..."
	black src || exit 1
	@echo "[LINT] Verification du lint avec flake8..."
	flake8 src || exit 1

build:
	@echo "[BUILD] Compilation des fichiers Python..."
	python -m compileall src || exit 1
	@echo "[BUILD] Verification du format avec black..."
	black --check src || exit 1
	@echo "[BUILD] Verification du lint avec flake8..."
	flake8 src || exit 1
	@echo "[BUILD] Verification du typage avec mypy..."
	mypy src || exit 1
	@echo "[BUILD] Build completed with success."

run:
	@echo "[RUN] Demarrage du serveur en mode production..."
	uvicorn main:app --host 0.0.0.0 --port 8000

dev:
	@echo "[DEV] Demarrage du serveur en mode developpement avec rechargement..."
	uvicorn main:app --reload --host 0.0.0.0 --port 8000
