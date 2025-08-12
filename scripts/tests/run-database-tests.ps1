# ChatERP/scripts/tests/run-database-tests.ps1

# 🧪 Script PowerShell – Exécution des tests du système Database de ChatERP
#
# 🧭 Objectif :
#   Exécute automatiquement les tests unitaires et d’intégration du système Database (FastAPI + Persistence).
#
# 📁 Dossier contenant les tests :
#   - systems/database/chaterp-persistence-tests
#
# 📁 Dossier contenant le code source :
#   - systems/database/chaterp-persistence
#
# ⚙️ Comportement :
#   - Active un environnement virtuel `.venv` si présent
#   - Crée l’environnement virtuel et installe les dépendances (si Activate.ps1 est absent)
#   - Lance les tests via `pytest` dans le module `chaterp-persistence-tests`
#
# ✅ Résultat :
#   - Affiche un message clair selon le succès ou l’échec des tests
#   - Retourne le code de sortie correspondant (0 = succès, ≠0 = échec)
#
# ▶️ Exemple d’exécution depuis la racine du projet :
#   PS C:\Code\ChatERP> powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-database-tests.ps1
#
# 📝 Écrit en UTF-8 pour un affichage correct des messages multilingues


Write-Host "`n================== 🚀 Tests Database – Lancement ==================`n"

$testPath = "systems/database/chaterp-persistence-tests"

if (-Not (Test-Path $testPath)) {
    Write-Error "❌ Dossier introuvable : $testPath"
    exit 1
}

Push-Location $testPath

if (-Not (Test-Path "../chaterp-persistence/.venv/Scripts/Activate.ps1")) {
    Write-Host "⚙️ Création d’un environnement virtuel Python…"
    Push-Location "../chaterp-persistence"
    python -m venv .venv
    .venv/Scripts/Activate.ps1
    pip install -r requirements.txt
    Pop-Location
}

.venv\Scripts\Activate.ps1

pytest

$exitCode = $LASTEXITCODE
Pop-Location

if ($exitCode -ne 0) {
    Write-Error "================== ❌ Tests Database - Échec (code $exitCode) =================="
    exit $exitCode
}

Write-Host "`n================== ✅ Tests Database - Succès ==================`n"
exit 0
