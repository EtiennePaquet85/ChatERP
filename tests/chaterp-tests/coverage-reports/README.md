# 📊 ChatERP – Couverture

Ce document fournit un aperçu général de la stratégie de **couverture de tests** dans le projet **ChatERP**, organisée selon les trois sous-systèmes suivants :

- **Backend (.NET 8)**
- **Database (Python)**
- **Frontend (Node/Vite)**

Chaque sous-système dispose d’un dossier `coverage-report/` contenant un **rapport HTML interactif** ainsi qu’un guide dédié à son exécution et à son automatisation.

---

## 📁 Structure de haut niveau

Les rapports de couverture sont regroupés par système selon la structure suivante :

~~~  
ChatERP/  
├── systems/  
│   ├── backend/  
│   │   └── chaterp-server-tests/  
│   │       ├── coverage-report/  
│   │       │   ├── coverage/                     # Rapport HTML généré pour le backend  
│   │       │   │   ├── index.html                # Page principale  
│   │       │   │   └── ...                       # Fichiers annexes (JS, CSS, etc.)  
│   │       │   └── couverture-tests-backend.md   # Guide versionné du rapport backend  
│   ├── database/  
│   │   └── chaterp-persistence-tests/  
│   │       ├── coverage-report/  
│   │       │   ├── coverage/                     # Rapport HTML généré pour la database 
│   │       │   │   ├── index.html                # Page principale  
│   │       │   │   └── ...                       # Fichiers annexes (JS, CSS, etc.)  
│   │       │   └── couverture-tests-database.md  # Guide versionné du rapport database  
│   └── frontend/  
│       └── chaterp-web-tests/  
│           ├── coverage-report/  
│           │   ├── coverage/                     # Rapport HTML généré pour le frontend  
│           │   │   ├── index.html                # Page principale  
│           │   │   └── ...                       # Fichiers annexes (JS, CSS, etc.)  
│           │   └── couverture-tests-frontend.md  # Guide versionné du rapport frontend  
~~~  

> Les dossiers `coverage/` contiennent les fichiers générés (HTML, CSS, JS) et sont **ignorés dans Git**. Seuls les fichiers `.md` sont versionnés pour documenter et partager les résultats.

Cette organisation distincte par système facilite la maintenance, la consultation et le partage clair des rapports de couverture pour chaque couche du projet.

---

## 🧩 Systèmes couverts

### ✅ 1. `Backend` – Logique métier

📄 Guide : [couverture-tests-backend.md](../../../systems/backend/chaterp-server-tests/coverage-report/couverture-tests-backend.md)

- Tests écrits en C# avec xUnit.
- Couverture mesurée avec Coverlet.
- Rapport HTML généré à l'aide de `ReportGenerator`.
- Commande personnalisée : `dotnet test-coverage`.

🔧 Outils : `.NET 8`, `xUnit`, `Coverlet`, `ReportGenerator`, `PowerShell`.

---

### ✅ 2. `Database` – Accès aux données

📄 Guide : [couverture-tests-database.md](../../../systems/database/chaterp-persistence-tests/coverage-report/couverture-tests-database.md)

- Tests écrits en Python avec Pytest.
- Couverture mesurée via `pytest-cov`.
- Rapport HTML généré automatiquement.
- Commande : `make test-coverage`.

🔧 Outils : `pytest`, `pytest-cov`, `Makefile`, `virtualenv`.

---

### ✅ 3. `Frontend` – Interface Web

📄 Guide : [couverture-tests-frontend.md](../../../systems/frontend/chaterp-web-tests/coverage-report/couverture-tests-frontend.md)

- Tests écrits avec `Vitest`.
- Couverture intégrée via `v8`.
- Rapport HTML généré automatiquement.
- Commande : `npm run test:coverage`.

🔧 Outils : `Vitest`, `v8`, `Node.js`, `TypeScript`.

---

## 🎯 Objectifs de couverture

- 🎯 Viser **100 %** de couverture de lignes de code par sous-système.
- 🧪 Identifier les portions non testées via les rapports HTML.
- 🔁 Intégrer les tests dans les workflows CI/CD (GitHub Actions, Azure DevOps, etc.).
- 🚫 Ne **pas versionner** les fichiers générés (HTML/assets), mais conserver les guides `.md`.

---

## 📌 Bonnes pratiques

- Vérifier que les rapports sont mis à jour régulièrement.
- Ajouter un badge de couverture dans le fichier `README.md` principal.
- Prévoir l’exécution automatique dans les pipelines Docker et CI/CD.
- Documenter toute configuration liée aux tests dans chaque guide associé.

---

## 📚 Références

- [ReportGenerator](https://github.com/danielpalme/ReportGenerator)  
- [pytest-cov](https://pytest-cov.readthedocs.io/)  
- [Vitest](https://vitest.dev/guide/)
