# systems/backend/chaterp-server-tests/scripts/generate-coverage-report.ps1

# 🚀 Script pour générer un rapport HTML de couverture de tests backend
#
# 💡 Ce script peut être exécuté tel quel si `reportgenerator` est installé.
#
# 📁 Emplacement de sortie : systems/backend/chaterp-server-tests/coverage-report/coverage/
#
# ▶️ Exemple d'exécution depuis le dossier de test :
# PS C:\Code\ChatERP\systems\backend\chaterp-server-tests> powershell.exe -ExecutionPolicy Bypass -File ./scripts/generate-coverage-report.ps1
#
# 📦 Prérequis :
#   - Installer reportgenerator via : `dotnet tool install -g dotnet-reportgenerator-globaltool`
#   - S'assurer que le dossier ~/.dotnet/tools est dans votre PATH

param (
    [string]$OutputDir = "coverage-report/coverage"
)

# Forcer l'encodage UTF8 pour la sortie console (Windows PowerShell)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = New-Object -typename System.Text.UTF8Encoding

$ErrorActionPreference = "Stop"

try {
    Write-Host "`n🚀 Lancement de la génération du rapport de couverture.`n"

    $reportGeneratorCmd = "reportgenerator"
    $inputPattern = "TestResults/**/coverage.cobertura.xml"

    if (-not (Get-Command $reportGeneratorCmd -ErrorAction SilentlyContinue)) {
        Write-Error "❌ 'reportgenerator' n'est pas disponible dans le PATH.`n"
        Write-Host "➡ Veuillez l’installer avec : dotnet tool install -g dotnet-reportgenerator-globaltool`n"
        exit 1
    }

    $files = Get-ChildItem -Path "TestResults" -Filter "coverage.cobertura.xml" -Recurse
    if ($files.Count -eq 0) {
        Write-Error "❌ Aucun fichier coverage.cobertura.xml trouvé dans TestResults.`n"
        exit 1
    }

    if (!(Test-Path $OutputDir)) {
        New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    }

    Write-Host "⏱️ Génération en cours...`n"

    & $reportGeneratorCmd `
        "-reports:$inputPattern" `
        "-targetdir:$OutputDir" `
        "-reporttypes:Html" `
        "-verbosity:Error" `
        "-assemblyfilters:+chaterp-server"

    if ($LASTEXITCODE -ne 0) {
        Write-Error "❌ reportgenerator a échoué avec le code $LASTEXITCODE.`n"
        exit $LASTEXITCODE
    }

    Write-Host "✅ Rapport HTML généré : '$OutputDir/index.html'`n"
}
catch {
    Write-Error "❌ Une erreur s’est produite lors de la génération du rapport : $_`n"
    exit 1
}
