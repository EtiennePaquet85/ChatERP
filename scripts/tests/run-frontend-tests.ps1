# ChatERP/scripts/tests/run-frontend-tests.ps1

# 🧪 Script PowerShell – Exécution des tests du système Frontend de ChatERP
#
# 🧭 Objectif :
#   Exécute automatiquement les tests unitaires et d’intégration du système Frontend (React + Vitest).
#
# 📁 Dossier contenant les tests :
#   - systems/frontend/chaterp-web-tests
#
# 📁 Dossier contenant le code source :
#   - systems/database/chaterp-web
#
# ⚙️ Comportement :
#   - Vérifie que le dossier des tests existe
#   - Installe les dépendances npm si le dossier `node_modules` est absent
#   - Lance les tests via la commande `npx vitest run`
#
# ✅ Résultat :
#   - Affiche un message clair selon le succès ou l’échec des tests
#   - Retourne le code de sortie correspondant (0 = succès, ≠0 = échec)
#
# ▶️ Exemple d’exécution depuis la racine du projet :
#   PS C:\Code\ChatERP> powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-frontend-tests.ps1
#
# 📝 Écrit en UTF-8 pour un affichage correct des messages multilingues


Write-Host "`n================== 🚀 Tests Frontend – Lancement ==================`n"

$testPath = "systems/frontend/chaterp-web-tests"

if (-Not (Test-Path $testPath)) {
    Write-Error "❌ Dossier introuvable : $testPath"
    exit 1
}

Push-Location $testPath

if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..."
    npm install
}

npx vitest run

$exitCode = $LASTEXITCODE
Pop-Location

if ($exitCode -ne 0) {
    Write-Error "================== ❌ Tests Frontend - Échec (code $exitCode) =================="
    exit $exitCode
}
 
Write-Host "`n================== ✅ Tests Frontend - Succès ==================`n"
exit 0
