# ChatERP/scripts/tests/run-all-tests.ps1

# 🧪 Script PowerShell – Exécution globale des tests du projet ChatERP
#
# 🧭 Objectif :
#   Exécute automatiquement l'ensemble des tests du projet ChatERP : frontend, backend et database.
#   Le script appelle successivement les sous-scripts de test pour chaque système, et synthétise les résultats.
#
# ⚙️ Comportement :
#   - Gestion des erreurs dans chaque sous-script
#   - Affichage d’un résumé global en fin d’exécution
#
# 📄 Scripts invoqués :
#   - run-frontend-tests.ps1
#   - run-backend-tests.ps1
#   - run-database-tests.ps1
#
# ✅ Résultat :
#   - Affiche en couleur les étapes de test
#   - Retourne un code de sortie 0 si tous les tests réussissent, 1 en cas d'échec
#
# ▶️ Exemple d’exécution depuis la racine du projet :
#   PS C:\Code\ChatERP> powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-all-tests.ps1
#
# 📝 Écrit en UTF-8 pour un affichage correct des symboles et messages multilingues


Write-Host "`n================== 🚀 Lancement des tests ChatERP ==================`n" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

$frontendTestsScript = Join-Path $scriptDir "run-frontend-tests.ps1"
$backendTestsScript  = Join-Path $scriptDir "run-backend-tests.ps1"
$databaseTestsScript = Join-Path $scriptDir "run-database-tests.ps1"

$global:hasFailed = $false

# 🧪 1. Tests FRONTEND
Write-Host "`n▶️  Démarrage des tests FRONTEND`n" -ForegroundColor Yellow
try {
    & $frontendTestsScript
    if ($LASTEXITCODE -ne 0) { $global:hasFailed = $true }
} catch {
    Write-Error "`n❌ Erreur inattendue dans le script frontend`n"
    $global:hasFailed = $true
}

# 🧪 2. Tests BACKEND
Write-Host "`n▶️  Démarrage des tests BACKEND`n" -ForegroundColor Yellow
try {
    & $backendTestsScript
    if ($LASTEXITCODE -ne 0) { $global:hasFailed = $true }
} catch {
    Write-Error "`n❌ Erreur inattendue dans le script backend`n"
    $global:hasFailed = $true
}

# 🧪 3. Tests DATABASE
Write-Host "`n▶️  Démarrage des tests DATABASE`n" -ForegroundColor Yellow
try {
    & $databaseTestsScript
    if ($LASTEXITCODE -ne 0) { $global:hasFailed = $true }
} catch {
    Write-Error "`n❌ Erreur inattendue dans le script database`n"
    $global:hasFailed = $true
}

# ✅ Résultat global
if ($global:hasFailed) {
    Write-Host "`n================== ❌ Un ou plusieurs tests ont échoué ==================`n" -ForegroundColor Red
    exit 1
} else {
    Write-Host "`n================== ✅ Tous les tests ont réussi ==================`n" -ForegroundColor Green
    exit 0
}
