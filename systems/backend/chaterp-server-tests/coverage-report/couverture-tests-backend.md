# 📊 ChatERP - Couverture des tests Backend

Ce guide explique comment **préparer l’environnement**, **nettoyer les anciens rapports**, **lancer les tests avec couverture**, et **générer un rapport HTML interactif** pour le système `Backend`.

---

## ⚙️ 1. Préparer l’environnement de test

### 📁 Positionnement requis :  

Toutes les commandes doivent être exécutées depuis le dossier **`chaterp-server-tests`**, situé dans `ChatERP/systems/backend/` :  

- Terminal :  
~~~
cd ChatERP/systems/backend/chaterp-server-tests
~~~

### ✅ Installer les dépendances ASP.NET

Assure-toi que .NET 8 est installé, puis installe les dépendances :

- Terminal :  
~~~
dotnet restore
~~~

### ✅ Installer l’outil CLI personnalisé `dotnet test-coverage`

Le projet inclut un outil CLI personnalisé situé dans `tools/test-coverage/`.

La commande suivante installe localement la commande personnalisée `dotnet test-coverage` :

- Terminal :  
~~~
dotnet tool restore
~~~

---

## 🧹 2. Nettoyer les anciens rapports de couverture

Avant de lancer de nouveaux tests, tu peux supprimer les anciens rapports pour éviter toute confusion :

- Terminal :
~~~
dotnet test-clean
~~~

Cette commande supprime les dossiers `coverage-report/coverage/` et `TestResults/`.

---

## 🧪 3. Lancer les tests avec couverture et générer le rapport HTML

Utilise la commande suivante pour exécuter les tests avec génération automatique du rapport :

- Terminal :  
~~~
dotnet test-coverage
~~~

Cette commande :

- Exécute tous les tests définis dans `tests/`, avec collecte de couverture (`--collect:"XPlat Code Coverage"`).  
- Calcule la couverture du dossier `backend/chaterp-server/src/`, et génère le fichier `coverage.cobertura.xml` dans `TestResults/`.  
- Génère un rapport HTML dans `coverage-report/coverage/index.html`, à l'aide du script `generate-coverage-report.ps1`, situé dans `scripts/`.  
- Affiche un résumé de la couverture dans le terminal.

---

### 🔁 Alternative : exécution manuelle (sans utiliser `dotnet test-coverage`)

#### Étape A : Lancer les tests avec couverture

- Terminal :  
~~~
dotnet test --collect:"XPlat Code Coverage" --results-directory TestResults
~~~

#### Étape B : Générer le rapport HTML

- Terminal :  
~~~
powershell -ExecutionPolicy Bypass -File ./scripts/generate-coverage-report.ps1
~~~

---

## 🌐 4. Consulter le rapport HTML

Ouvre le fichier `coverage-report/coverage/index.html` dans un navigateur web (double-clic ou via "Ouvrir avec...").

Ce rapport interactif permet de :

- Visualiser la couverture par fichier, module et ligne.  
- Identifier les portions de code non testées.

---

## 📁 5. Structure du dossier `coverage-report/`

~~~
coverage-report/
├── coverage/                       # Rapport HTML généré
│   ├── index.html                  # Page principale du rapport
│   └── ...                         # Fichiers HTML, JS, assets, etc.
├── couverture-tests-backend.md     # Ce document versionné
~~~

---

## 🔒 6. Git – Gestion du dossier de couverture

Seul le dossier **`coverage`**, situé dans `coverage-report/`, est ignoré dans Git via `.gitignore` afin de :

- Conserver le fichier `couverture-tests-backend.md` versionné.  
- Éviter de versionner les fichiers générés automatiquement et volumineux (HTML, assets...).

---

## ✅ 7. Bonnes pratiques & automatisation

- Maintenir une couverture de tests ≥ 90 %.  
- Ajouter l'exécution automatique des tests dans le pipeline Docker/Docker Compose.  
- Intégrer l'automatisation dans les pipelines CI/CD (GitHub Actions, Azure DevOps...).  
- Utiliser un badge dans le README pour suivre la couverture.

---

## 📚 8. Références utiles

- [ReportGenerator – GitHub](https://github.com/danielpalme/ReportGenerator)  
- Configuration : `chaterp-server-tests.csproj`, `coverlet.runsettings`, `.config/dotnet-tools.json`  
- Code source : `backend/chaterp-server/src`  
- Tests unitaires : `backend/chaterp-server-tests/tests`
