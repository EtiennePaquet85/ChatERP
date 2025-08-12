# systems/backend/chaterp-server-tests/scripts/update-test-coverage-tool.ps1

# 🔄 Script : update-test-coverage-tool.ps1
# 🔧 Mise à jour locale de l’outil CLI `test-coverage`
#
# Ce script effectue les opérations suivantes :
# 1. Supprime le cache NuGet global de l’outil s’il existe
# 2. Repack le projet .NET en un nouveau `.nupkg`
# 3. Désinstalle l’outil localement
# 4. Réinstalle l’outil depuis le dossier `./nupkg`
#
# ▶️ Exemple d'exécution depuis le dossier de test :
# PS C:\Code\ChatERP\systems\backend\chaterp-server-tests> powershell.exe -ExecutionPolicy Bypass -File ./scripts/update-test-coverage-tool.ps1
#
# 🧪 Utilisation typique après modification du code de l’outil sans changement de version

$ErrorActionPreference = "Stop"

Write-Host "`n🔄 Mise à jour de l'outil CLI 'test-coverage'...`n"

# 🔍 Étape 1 : Supprimer le cache NuGet global de l’outil s’il existe (Nécessaire pour forcer la mise à jour)
$nugetCache = Join-Path $env:USERPROFILE ".nuget\packages\test-coverage"
if (Test-Path $nugetCache) {
    Write-Host "🧹 Suppression du cache NuGet global : $nugetCache`n"
    Remove-Item -Recurse -Force $nugetCache
} else {
    Write-Host "✅ Aucun cache NuGet global à supprimer.`n"
}

# 📦 Étape 2 : Repack du projet outil en fichier .nupkg
$toolProjectPath = "tools/test-coverage"
$nupkgOutputPath = "nupkg"
Write-Host "📦 Packaging de l’outil dans '$nupkgOutputPath'...`n"
dotnet pack $toolProjectPath --output $nupkgOutputPath | Out-Null

# 🧽 Étape 3 : Désinstallation de la version locale existante
Write-Host "🧽 Suppression de l’outil CLI existant (si présent)...`n"
dotnet tool uninstall test-coverage | Out-Null

# 📥 Étape 4 : Réinstallation de l’outil depuis le dossier ./nupkg
Write-Host "📥 Réinstallation de l’outil CLI depuis './nupkg'...`n"
dotnet tool install test-coverage --add-source ./nupkg | Out-Null

Write-Host "✅ Mise à jour terminée avec succès !`n"
Write-Host "🚀 Tu peux maintenant exécuter : dotnet test-coverage`n"
