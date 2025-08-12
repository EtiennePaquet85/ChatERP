# systems/database/chaterp-persistence-tests/Makefile

# 📂 Makefile pour chaterp-persistence-tests (FastAPI)
# Pour Windows + Git Bash ou WSL
# Usage :
#   make test            => Lancement des tests unitaires (sans couverture)
#   make test-coverage   => Lancement des tests unitaires (avec couverture)
#   make clean           => Nettoyage des fichiers temporaires et rapports

.PHONY: test test-coverage test-clean

test:
	@echo "[TEST] Lancement des tests unitaires sans couverture..."
	pytest

test-coverage:
	@echo "[COVERAGE] Lancement des tests unitaires avec couverture..."
	pytest --cov=src --cov-report=term-missing --cov-report=html:coverage-report/coverage

test-clean:
	@echo "[CLEAN] Suppression des fichiers temporaires et rapports de couverture..."
	rm -rf .pytest_cache coverage-report/coverage .coverage
