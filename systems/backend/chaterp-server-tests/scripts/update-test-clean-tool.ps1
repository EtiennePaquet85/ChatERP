# systems/backend/chaterp-server-tests/scripts/update-test-clean-tool.ps1

# 🔄 Script : update-test-clean-tool.ps1
# 🔧 Mise à jour locale de l’outil CLI `test-clean`
#
# Ce script effectue les opérations suivantes :
# 1. Supprime le cache NuGet global de l’outil s’il existe
# 2. Repack le projet .NET en un nouveau `.nupkg`
# 3. Désinstalle l’outil localement
# 4. Réinstalle l’outil depuis le dossier `./nupkg`
#
# ▶️ Exemple d'exécution depuis le dossier de test :
# PS C:\Code\ChatERP\systems\backend\chaterp-server-tests> powershell.exe -ExecutionPolicy Bypass -File ./scripts/update-test-clean-tool.ps1
#
# 🧪 Utilisation typique après modification du code de l’outil sans changement de version

$ErrorActionPreference = "Stop"

Write-Host "`n🔄 Mise à jour de l'outil CLI 'test-clean'...`n"

# 🔍 Étape 1 : Supprimer le cache NuGet global de l’outil s’il existe
$nugetCache = Join-Path $env:USERPROFILE ".nuget\packages\test-clean"
if (Test-Path $nugetCache) {
    Write-Host "🧹 Suppression du cache NuGet global : $nugetCache`n"
    Remove-Item -Recurse -Force $nugetCache
} else {
    Write-Host "✅ Aucun cache NuGet global à supprimer.`n"
}

# 📦 Étape 2 : Repack du projet outil en fichier .nupkg
$toolProjectPath = "tools/test-clean"
$nupkgOutputPath = "nupkg"
Write-Host "📦 Packaging de l’outil dans '$nupkgOutputPath'...`n"
dotnet pack $toolProjectPath --output $nupkgOutputPath | Out-Null

# 🧽 Étape 3 : Désinstallation de la version locale existante
Write-Host "🧽 Suppression de l’outil CLI existant (si présent)...`n"
dotnet tool uninstall test-clean | Out-Null

# 📥 Étape 4 : Réinstallation de l’outil depuis le dossier ./nupkg
Write-Host "📥 Réinstallation de l’outil CLI depuis './nupkg'...`n"
dotnet tool install test-clean --add-source ./nupkg | Out-Null

Write-Host "✅ Mise à jour terminée avec succès !`n"
Write-Host "🚀 Tu peux maintenant exécuter : dotnet test-clean`n"
