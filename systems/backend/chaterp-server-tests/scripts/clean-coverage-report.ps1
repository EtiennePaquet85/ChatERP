# systems/backend/chaterp-server-tests/scripts/clean-coverage-report.ps1

# 🧹 Script pour nettoyer les dossiers et fichiers de couverture de tests backend
#
# 📁 Emplacements nettoyés :
#    - systems/backend/chaterp-server-tests/coverage-report/coverage/
#    - systems/backend/chaterp-server-tests/TestResults/
#
# ▶️ Exemple d'exécution depuis le dossier de test :
# PS C:\Code\ChatERP\systems\backend\chaterp-server-tests> powershell.exe -ExecutionPolicy Bypass -File ./scripts/clean-coverage-report.ps1

param (
    [string]$CoverageDir = "coverage-report/coverage",
    [string]$TestResultsDir = "TestResults"
)

# Forcer l'encodage UTF8 pour la sortie console (Windows PowerShell)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = New-Object -typename System.Text.UTF8Encoding

$ErrorActionPreference = "Stop"

try {
    Write-Host "`n📂 Suppression des répertoires suivants :"
    Write-Host "   - $CoverageDir"
    Write-Host "   - $TestResultsDir"

    if (Test-Path $CoverageDir) {
        Remove-Item -Recurse -Force $CoverageDir
        Write-Host "`n✔  Dossier supprimé : $CoverageDir"
    } else {
        Write-Host "`nℹ  Dossier introuvable : $CoverageDir"
    }

    if (Test-Path $TestResultsDir) {
        Remove-Item -Recurse -Force $TestResultsDir
        Write-Host "✔  Dossier supprimé : $TestResultsDir"
    } else {
        Write-Host "ℹ  Dossier introuvable : $TestResultsDir"
    }

    Write-Host "`n✅ Script terminé : tous les répertoires ciblés ont été traités.`n"
}
catch {
    Write-Error "`n❌ Une erreur s’est produite lors du nettoyage : $_`n"
    exit 1
}
