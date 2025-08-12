# 🧪 ChatERP – Tests unitaires

Ce document fournit un aperçu général de la stratégie de **tests unitaires** dans le projet **ChatERP**, organisée selon les trois sous-systèmes suivants :

- **Backend (.NET 8)**
- **Database (Python)**
- **Frontend (Node/Vite)**

Chaque sous-système dispose de son propre répertoire de tests, structuré par couche logique (services, contrôleurs, gestionnaires, etc.) et aligné avec les cas d’usage fonctionnels (UC01 à UC04).

---

## 📁 Structure de haut niveau

Les tests unitaires sont regroupés sont regroupés par système selon la structure suivante :

~~~
ChatERP/
├── systems/
│   ├── backend/
│   │   └── chaterp-server-tests/
│   ├── database/
│   │   └── chaterp-persistence-tests/
│   └── frontend/
│       └── chaterp-web-tests/
├── tests/
│   └── chaterp-tests/
│       ├── coverage-reports/
│       │   └── README.md
│       ├── integration-tests/
│       │   └── README.md
│       ├── unit-tests/
│       │   └── README.md
│       └── chaterp-tests.csproj
~~~

> Les tests sont organisés par **cas d’usage** (unitaires, intégration) et par **couche logique** (frontend, backend, database).

Cette organisation facilite la maintenance, la clarté et la scalabilité des suites de tests dans l’ensemble du projet.

---

## 🧩 Systèmes testés

### ✅ 1. `Backend` – Logique métier

📁 Dossier : `systems/backend/chaterp-server-tests/`

- Tests unitaires écrits en **C#** avec `xUnit`.
- Organisation par contrôleur (`Controllers/`) et par service (`Services/`).
- Fichiers nommés selon les cas d’usage (ex. : `UC01a`, `UC02b`, etc.).
- Scripts PowerShell pour la génération de rapports et la gestion des outils.

🔧 Outils : `.NET 8`, `xUnit`, `PowerShell`, `CLI personnalisée`.

~~~
chaterp-server-tests/
├── tests/
│   ├── Controllers/
│   │   ├── EmployeesController.Tests.UC01a.cs
│   │   ├── ...
│   ├── Services/
│   └── Clients/
~~~

---

### ✅ 2. `Database` – Accès aux données

📁 Dossier : `systems/database/chaterp-persistence-tests/`

- Tests unitaires écrits en **Python** avec `pytest`.
- Organisation par couche FastAPI (`routers/`, `repositories/`, `managers/`).
- Fichiers séparés pour chaque cas d’usage (ex. : `test_employee_router_uc02b.py`).

🔧 Outils : `pytest`, `Makefile`, `virtualenv`, `Pytest Fixtures`.

~~~
chaterp-persistence-tests/
├── tests/
│   ├── routers/
│   │   ├── test_employee_router_uc01a.py
│   │   ├── ...
│   ├── repositories/
│   └── managers/
~~~

---

### ✅ 3. `Frontend` – Interface Web

📁 Dossier : `systems/frontend/chaterp-web-tests/`

- Tests unitaires écrits en **TypeScript** avec `Vitest`.
- Organisation par composants, pages, gestionnaires (`handlers/`, `components/`).
- Fichiers nommés selon les UC (ex. : `employeeHandler.uc03.test.ts`).

🔧 Outils : `Vitest`, `v8`, `TypeScript`, `Node.js`.

~~~
chaterp-web-tests/
├── tests/
│   ├── handlers/
│   │   ├── employeeHandler.uc01a.test.ts
│   │   ├── ...
│   ├── components/
│   └── pages/
~~~

---

## 🎯 Objectifs des tests unitaires

- Valider chaque **composant isolé** du système indépendamment des autres.
- S'assurer que chaque **cas d’usage métier** est testé au niveau de l’unité.
- Couvrir les **branches conditionnelles** critiques du code.
- Compléter les **tests d’intégration** sans les dupliquer.

---

## 📌 Bonnes pratiques

- Utiliser des **noms de fichiers explicites** incluant le numéro de cas d’usage.
- Éviter les tests redondants avec l’intégration.
- Exécuter les tests automatiquement dans les pipelines Docker et CI/CD.
- Isoler les tests des dépendances réseau, I/O, ou système (mock/stub).

---

## 📚 Références

- [xUnit – .NET Testing Framework](https://xunit.net/)
- [pytest – Python Testing Framework](https://docs.pytest.org/)
- [Vitest – Unit Testing for Vite](https://vitest.dev/)
