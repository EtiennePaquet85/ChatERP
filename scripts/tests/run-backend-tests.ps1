# ChatERP/scripts/tests/run-backend-tests.ps1

# 🧪 Script PowerShell – Exécution des tests du système Backend de ChatERP
#
# 🧭 Objectif :
#   Exécute automatiquement les tests unitaires et d’intégration du système Backend (.NET 8).
#
# 📁 Dossier contenant les tests :
#   - systems/backend/chaterp-server-tests
#
# 📁 Dossier contenant le code source :
#   - systems/database/chaterp-server
#
# ⚙️ Comportement :
#   - Vérifie l’existence du dossier
#   - Change de dossier temporairement (`Push-Location`)
#   - Exécute les tests et gère le retour
#   - Affiche des messages colorés pour l’état final
#
# ✅ Résultat :
#   - Lance `dotnet test`
#   - Affiche le statut des tests (succès ou échec)
#   - Retourne le code d’erreur approprié
#
# ▶️ Exemple d’exécution depuis la racine du projet :
#   PS C:\Code\ChatERP> powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-backend-tests.ps1
#
# 📝 Écrit en UTF-8 pour un affichage correct des symboles et messages multilingues


Write-Host "`n==================🚀 Tests Backend – Lancement ==================`n"

$testPath = "systems/backend/chaterp-server-tests"

if (-Not (Test-Path $testPath)) {
    Write-Error "❌ Dossier introuvable : $testPath"
    exit 1
}

Push-Location $testPath

dotnet test

$exitCode = $LASTEXITCODE
Pop-Location

if ($exitCode -ne 0) {
    Write-Error "================== ❌ Tests Backend - Échec (code $exitCode) =================="
    exit $exitCode
}

Write-Host "`n================== ✅ Tests Backend - Succès ==================`n"
exit 0
