# ChatERP/scripts/structure/generate-project-structure-files.ps1

# 📂 Script PowerShell – Générateur d’arborescence du projet ChatERP
#
# 🧭 Objectif :
#   Génère un fichier Markdown contenant l’arborescence complète du projet ChatERP (avec fichiers).
#   Seuls les dossiers et fichiers pertinents sont inclus, pour aider à comprendre la structure logicielle.
#
# 📄 Fichier généré : docs/software-structure/project-structure-files.md
#
# 🔍 Contenu :
#   - Titre et introduction au format Markdown
#   - Arborescence avec indentation visuelle (├──, └──, │)
#   - Bloc de code Markdown (~~~) pour mise en page claire
#
# 🚫 Dossiers exclus :
#   bin, obj, .vs, .git, node_modules, Debug, Release, wwwroot, .github, Properties, .idea, .venv, __pycache__, .mypy_cache, Dist
#
# ▶️ Exemple d’exécution depuis la racine du projet :
#   PS C:\Code\ChatERP> powershell -ExecutionPolicy Bypass -File .\scripts\structure\generate-project-structure-files.ps1
#
# 📝 Écrit en UTF-8 pour supporter les caractères spéciaux.


# 📌 Étape 1 : Définir le répertoire racine du projet
$root = Get-Location

# 📌 Étape 2 : Définir le chemin du fichier de sortie
$output = Join-Path $root "docs\software-structure\project-structure-files.md"

# 📌 Étape 3 : Définir la liste des dossiers à exclure de l’arborescence
$excluded = @("bin", "obj", ".vs", ".git", "node_modules", "Debug", "Release", "wwwroot", ".github", "Properties", ".idea", ".venv", "__pycache__", ".mypy_cache", "Dist")

# 📌 Étape 4 : Définir le contenu d’introduction du fichier Markdown
$intro = @"
# 🌳 ChatERP - Arborescence du projet avec fichiers

Voici la structure simplifiée du projet ChatERP, montrant les principaux dossiers et fichiers.  
Cette organisation facilite le développement, les tests, la documentation, et le déploiement.

---

## 🌳 Arborescence simplifiée avec fichiers

Voici la structure actuelle du projet, incluant les dossiers et fichiers principaux :

~~~  
"@

# 📌 Étape 5 : Définir la ligne de fermeture du bloc de code Markdown
$outro = "~~~"

# 📌 Étape 6 : Écrire l’introduction dans le fichier de sortie
$intro | Out-File -FilePath $output -Encoding UTF8

# 📌 Étape 7 : Définir la fonction récursive pour générer l’arborescence (dossiers + fichiers)
function Get-DirectoryTree {
    param (
        [string]$path,
        [string]$prefix = "",
        [bool]$isLast = $true
    )

    $name = Split-Path -Leaf $path
    $connector = if ($prefix -eq "") { "" } elseif ($isLast) { "└── " } else { "├── " }

    # Écrire le nom du dossier
    "$prefix$connector$name/" | Out-File -FilePath $output -Encoding UTF8 -Append

    $newPrefix = if ($prefix -eq "") { "    " } elseif ($isLast) { "$prefix    " } else { "$prefix│   " }

    $items = Get-ChildItem -Path $path -Force | Where-Object {
        if ($_.PSIsContainer) {
            return $excluded -notcontains $_.Name
        } else {
            return $true
        }
    } | Sort-Object { -not $_.PSIsContainer }, Name

    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $itemIsLast = ($i -eq $items.Count - 1)

        if ($item.PSIsContainer) {
            Get-DirectoryTree -path $item.FullName -prefix $newPrefix -isLast $itemIsLast
        } else {
            $fileConnector = if ($itemIsLast) { "└── " } else { "├── " }
            "$newPrefix$fileConnector$item" | Out-File -FilePath $output -Encoding UTF8 -Append
        }
    }
}

# 📌 Étape 8 : Lancer la génération à partir du répertoire racine
Get-DirectoryTree -path $root

# 📌 Étape 9 : Ajouter la ligne de fermeture du bloc de code Markdown
$outro | Out-File -FilePath $output -Encoding UTF8 -Append
