# 🛠️ ChatERP - Vue d’ensemble des outils et scripts du projet ChatERP

Ce document présente une description détaillée des outils et scripts utilisés dans le projet ChatERP.  
Il vise à centraliser les informations pour faciliter la compréhension, l’utilisation et la maintenance des outils.

---

## 📂 structure-generator-files.ps1

- 📍 **Emplacement** : `scripts/structure-generator-files.ps1`  
- 📄 **Fichier généré** : `docs/software-tools/project-structure-files.md`  
- 📌 **Objectif** : Générer une arborescence complète incluant **dossiers et fichiers**.  
- 🚫 **Dossiers exclus** : `bin`, `obj`, `.vs`, `.git`, `node_modules`, `Debug`, `Release`, `wwwroot`, `.github`, `Properties`, `.idea`  
- 💬 **Fonctionnement** :  
  - Parcourt récursivement tous les dossiers du projet  
  - Affiche les dossiers et fichiers principaux avec une indentation visuelle (style arborescence)  
  - Utilise des symboles Unicode (`├──`, `└──`, `│`) pour une meilleure lisibilité  
  - Le résultat est encapsulé dans un bloc de code Markdown (~~~)  
- ▶️ **Commande d’exécution depuis la racine du projet** :  
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\structure-generator-files.ps1
  ~~~

---

## 📁 structure-generator-folders.ps1

- 📍 **Emplacement** : `scripts/structure-generator-folders.ps1`  
- 📄 **Fichier généré** : `docs/software-tools/project-structure-folders.md`  
- 📌 **Objectif** : Générer une représentation arborescente des **dossiers uniquement**.  
- 🚫 **Dossiers exclus** : `bin`, `obj`, `.vs`, `.git`, `node_modules`, `Debug`, `Release`, `wwwroot`, `.github`, `Properties`, `.idea`  
- 💬 **Fonctionnement** :  
  - Parcourt récursivement tous les dossiers du projet  
  - Affiche uniquement les dossiers principaux avec une indentation visuelle (style arborescence)  
  - Utilise des symboles Unicode (`├──`, `└──`, `│`) pour une meilleure lisibilité  
  - Le résultat est encapsulé dans un bloc de code Markdown (~~~)  
- ▶️ **Commande d’exécution depuis la racine du projet** :  
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\structure-generator-folders.ps1
  ~~~

---

## 🧪 run-all-tests.ps1

- 📍 **Emplacement** : `scripts/tests/run-all-tests.ps1`  
- 📌 **Objectif** : Exécuter l'ensemble des tests automatisés du projet ChatERP (frontend, backend et database).  
- 📄 **Scripts invoqués** :
  - `run-frontend-tests.ps1`
  - `run-backend-tests.ps1`
  - `run-database-tests.ps1`
- ✅ **Résultat attendu** :
  - Affiche le déroulement des tests avec couleurs
  - Retourne `0` si tous les tests passent, `1` sinon
- 💬 **Fonctionnement** :
  - Gère l’exécution et les erreurs de chaque sous-script
  - Affiche un résumé global clair à la fin
- ▶️ **Commande d’exécution depuis la racine du projet** :  
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-all-tests.ps1
  ~~~

---

## 🧪 run-backend-tests.ps1

- 📍 **Emplacement** : `scripts/tests/run-backend-tests.ps1`  
- 📌 **Objectif** : Exécuter les **tests unitaires et d’intégration du système Backend** de ChatERP (basé sur `.NET 8`).  
- 📁 **Répertoire des tests** : `systems/backend/chaterp-server-tests`   
- 📁 **Répertoire source** : `systems/backend/chaterp-server`  
- ✅ **Résultat attendu** :
  - Lance la commande `dotnet test`
  - Affiche des messages de succès ou d’échec avec couleurs
  - Retourne un code de sortie en fonction du résultat (`0` ou autre)
- 💬 **Fonctionnement** :
  - Vérifie que le dossier de test existe
  - Se déplace temporairement dans le dossier avec `Push-Location`
  - Exécute les tests via `dotnet test`
  - Restaure le dossier d’origine avec `Pop-Location`
  - Gère les erreurs et affiche un résumé clair du résultat
- ▶️ **Commande d’exécution depuis la racine du projet** :  
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-backend-tests.ps1
  ~~~

---

## 🧪 run-database-tests.ps1

- 📍 **Emplacement** : `scripts/tests/run-database-tests.ps1`  
- 📌 **Objectif** : Exécuter les **tests unitaires et d’intégration du système Database** de ChatERP (basé sur `FastAPI`).  
- 📁 **Répertoire des tests** : `systems/database/chaterp-persistence-tests`  
- 📁 **Répertoire source** : `systems/database/chaterp-persistence`  
- ✅ **Résultat attendu** :
  - Lance les tests via `pytest`
  - Active ou crée un environnement virtuel Python `.venv`
  - Installe les dépendances si nécessaire (`requirements.txt`)
  - Affiche des messages clairs de succès ou d’échec
  - Retourne un code de sortie en fonction du résultat (`0` ou autre)
- 💬 **Fonctionnement** :
  - Vérifie si l’environnement virtuel est présent
  - Le crée et installe les dépendances si absent
  - Active l’environnement virtuel
  - Lance `pytest` dans le répertoire des tests
  - Gère les erreurs et affiche un résumé clair
- ▶️ **Commande d’exécution depuis la racine du projet** :  
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-database-tests.ps1
  ~~~

---

## 🧪 run-frontend-tests.ps1

- 📍 **Emplacement** : `scripts/tests/run-frontend-tests.ps1`  
- 📌 **Objectif** : Exécuter les **tests unitaires et d’intégration du système Frontend** de ChatERP (basé sur React et Vitest).  
- 📁 **Répertoire des tests** : `systems/frontend/chaterp-web-tests`  
- 📁 **Répertoire source** : `systems/frontend/chaterp-web`  
- ✅ **Résultat attendu** :  
  - Installe les dépendances npm si `node_modules` est absent  
  - Lance la commande `npx vitest run` pour exécuter les tests  
  - Affiche des messages de succès ou d’échec avec couleurs  
  - Retourne un code de sortie selon le résultat (`0` = succès, autre = échec)  
- 💬 **Fonctionnement** :  
  - Vérifie l’existence du dossier des tests  
  - Installe les dépendances via `npm install` si nécessaire  
  - Exécute les tests via `vitest`  
  - Gère les erreurs et affiche un résumé clair du résultat  
- ▶️ **Commande d’exécution depuis la racine du projet** :    
  ~~~powershell
  powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-frontend-tests.ps1
  ~~~

---

## 🧼 clean-coverage-report.ps1

- 📍 **Emplacement** : `systems/backend/chaterp-server-tests/scripts/clean-coverage-report.ps1`  
- 📌 **Objectif** : Supprimer les **anciens rapports de couverture** HTML et les **résultats de test `.NET`** pour un nettoyage complet du dossier de tests backend.  
- 🧹 **Dossiers nettoyés** :
  - `systems/backend/chaterp-server-tests/coverage-report/coverage/`
  - `systems/backend/chaterp-server-tests/TestResults/`
- 💬 **Fonctionnement** :
  - Vérifie si les dossiers existent
  - Supprime les dossiers avec `Remove-Item -Recurse -Force`
  - Affiche des messages clairs pour chaque action
  - Gère les erreurs avec un message d’échec lisible 
- ▶️ **Commande d’exécution depuis le dossier `chaterp-server-tests`** :
  ~~~powershell
  powershell.exe -ExecutionPolicy Bypass -File ./scripts/clean-coverage-report.ps1
  ~~~
- 📝 **Notes** :  
  - Le script force l’encodage UTF-8 pour un affichage correct sur Windows PowerShell.  

---

## 🚀 generate-coverage-report.ps1

- 📍 **Emplacement** : `systems/backend/chaterp-server-tests/scripts/generate-coverage-report.ps1`  
- 📌 **Objectif** : Générer un rapport HTML interactif de couverture des tests backend (.NET) à partir des fichiers de couverture Cobertura XML.  
- 📄 **Sortie** : Dossier `systems/backend/chaterp-server-tests/coverage-report/coverage/` contenant le rapport HTML.  
- 📦 **Prérequis** :  
  - Installer l’outil `reportgenerator` globalement avec la commande :  
  ~~~powershell
  dotnet tool install -g dotnet-reportgenerator-globaltool
  ~~~  
  - S’assurer que le dossier `~/.dotnet/tools` est dans la variable d’environnement PATH pour pouvoir exécuter `reportgenerator`.  
- 💬 **Fonctionnement** :  
  - Recherche récursive des fichiers `coverage.cobertura.xml` dans `TestResults/`  
  - Vérifie la présence de l’outil `reportgenerator`  
  - Crée le dossier de sortie si nécessaire  
  - Lance `reportgenerator` avec les filtres adaptés au projet ChatERP (`+chaterp-server`)  
  - Affiche un message de succès avec le chemin vers le rapport HTML  
  - Gère proprement les erreurs et affiche des messages clairs  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-server-tests`** :
  ~~~powershell
  powershell.exe -ExecutionPolicy Bypass -File ./scripts/generate-coverage-report.ps1
  ~~~
- 📝 **Notes** :  
  - Le script force l’encodage UTF-8 pour un affichage correct sur Windows PowerShell.  
  - Le rapport HTML généré facilite la lecture et l’analyse de la couverture de tests.  

--- 

## 🔄 update-test-clean-tool.ps1

- 📍 **Emplacement** : `systems/backend/chaterp-server-tests/scripts/update-test-clean-tool.ps1`  
- 📌 **Objectif** : Mettre à jour localement l’outil CLI personnalisé `test-clean` sans changer la version.  
- 💡 **Usage** : Après modification du code source de l’outil CLI, ce script :  
  1. Supprime le cache NuGet global lié à `test-clean` pour forcer la mise à jour  
  2. Repack le projet `.NET` de l’outil dans un nouveau package `.nupkg`  
  3. Désinstalle la version locale actuelle de l’outil CLI  
  4. Réinstalle l’outil à partir du package `.nupkg` local  
- ⚙️ **Fonctionnement** :  
  - Recherche et supprime le dossier de cache NuGet global dans `%USERPROFILE%\.nuget\packages\test-clean`  
  - Utilise `dotnet pack` pour créer le package dans le dossier `nupkg`  
  - Utilise `dotnet tool uninstall` pour retirer l’outil existant  
  - Utilise `dotnet tool install` avec l’option `--add-source ./nupkg` pour installer la nouvelle version locale  
  - Affiche des messages d’état à chaque étape pour le suivi  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-server-tests`** :  
  ~~~powershell
  powershell.exe -ExecutionPolicy Bypass -File ./scripts/update-test-clean-tool.ps1
  ~~~
- 📝 **Notes** :  
  - Ce script suppose que `dotnet` est disponible dans le PATH.  
  - Permet de tester rapidement les modifications de l’outil CLI sans publication NuGet.  

---

## 🔄 update-test-coverage-tool.ps1

- 📍 **Emplacement** : `systems/backend/chaterp-server-tests/scripts/update-test-coverage-tool.ps1`  
- 📌 **Objectif** : Mettre à jour localement l’outil CLI personnalisé `test-coverage` sans changer la version.  
- 💡 **Usage** : Après modification du code source de l’outil CLI, ce script :  
  1. Supprime le cache NuGet global lié à `test-coverage` pour forcer la mise à jour  
  2. Repack le projet `.NET` de l’outil dans un nouveau package `.nupkg`  
  3. Désinstalle la version locale actuelle de l’outil CLI  
  4. Réinstalle l’outil à partir du package `.nupkg` local  
- ⚙️ **Fonctionnement** :  
  - Recherche et supprime le dossier de cache NuGet global dans `%USERPROFILE%\.nuget\packages\test-coverage`  
  - Utilise `dotnet pack` pour créer le package dans le dossier `nupkg`  
  - Utilise `dotnet tool uninstall` pour retirer l’outil existant  
  - Utilise `dotnet tool install` avec l’option `--add-source ./nupkg` pour installer la nouvelle version locale  
  - Affiche des messages d’état à chaque étape pour le suivi  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-server-tests`** :  
  ~~~powershell
  powershell.exe -ExecutionPolicy Bypass -File ./scripts/update-test-coverage-tool.ps1
  ~~~
- 📝 **Notes** :  
  - Ce script suppose que `dotnet` est disponible dans le PATH.  
  - Permet de tester rapidement les modifications de l’outil CLI sans publication NuGet.  

---

## 🐍 create_employees_db.py

- 📍 **Emplacement** : `systems/database/chaterp-persistence/scripts/create_employees_db.py`  
- 📌 **Objectif** : Créer ou mettre à jour la base SQLite `employees.db` avec la table `employees`.  
- 📁 **Base de données créée** : `ChatERP/systems/database/chaterp-persistence/data/employees.db`  
- 💬 **Fonctionnement** :  
  - Création du dossier `data` s’il n’existe pas  
  - Connexion asynchrone à SQLite via `aiosqlite`  
  - Exécution d’une commande SQL `CREATE TABLE IF NOT EXISTS` pour la table `employees`  
  - Engagement des modifications avec `commit()`  
  - Message confirmant la création ou la mise à jour de la base  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-persistence` (environnement virtuel activé)** :  
  ~~~bash
  python scripts/create_employees_db.py
  ~~~

---

## 🐍 read_employees_db.py

- 📍 **Emplacement** : `systems/database/chaterp-persistence/scripts/read_employees_db.py`  
- 📌 **Objectif** : Lire et afficher la liste des employés depuis la base SQLite `employees.db`.  
- 📁 **Base de données attendue** : `ChatERP/systems/database/chaterp-persistence/data/employees.db`  
- 💬 **Fonctionnement** :  
  - Connexion asynchrone à la base SQLite via `aiosqlite`  
  - Exécution d’une requête `SELECT` pour récupérer tous les champs de la table `employees`  
  - Affichage formaté de chaque employé sur la console  
  - Affiche un message si aucun employé n’est trouvé  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-persistence` (environnement virtuel activé)** :  
  ~~~bash
  python scripts/read_employees_db.py
  ~~~

---

## 🧼 clean-employees-css-classes.js

- 📍 **Emplacement** : `systems/frontend/chaterp-web/scripts/clean-employees-css-classes.js`  
- 📌 **Objectif** : Nettoyer automatiquement le fichier CSS `employees.css` en supprimant les classes CSS définies mais non utilisées dans le Frontend `chaterp-web`.  
- 📁 **Fichier CSS analysé** : `systems/frontend/chaterp-web/src/styles/employees.css`  
- 📂 **Dossier analysé** : `systems/frontend/chaterp-web/src` (analyse récursive des fichiers `.ts`, `.tsx`, `.js`, `.jsx`, `.html`)  
- 💬 **Fonctionnement** :  
  - Extraction statique de toutes les classes CSS définies dans `employees.css`  
  - Recherche des classes effectivement utilisées dans les fichiers sources via les attributs `class` et `className`  
  - Suppression des blocs CSS correspondants aux classes non utilisées  
  - Réécriture du fichier `employees.css` nettoyé  
- ✅ **Résultat affiché** :  
  - Nombre total de classes définies  
  - Nombre de classes utilisées  
  - Nombre de classes supprimées  
  - Confirmation de mise à jour du fichier CSS  
- 🔧 **Dépendances** :  
  - Node.js (aucun package externe)  
  - Modules Node.js natifs : `fs`, `path`, `url`  
- ▶️ **Commande d’exécution depuis le dossier `chaterp-web`** :  
  ~~~powershell  
  powershell.exe -ExecutionPolicy Bypass -File ./scripts/clean-employees-css-classes.js  
  ~~~  
- 📝 **Notes** :  
  - Script écrit en UTF-8  
  - Permet de maintenir un CSS minimal et cohérent dans le projet Frontend  

---

> **Note** :  
> Ce document est à jour à la date de dernière modification et doit être maintenu régulièrement pour refléter tout ajout, modification ou suppression de scripts dans le projet.
