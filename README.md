# 💼 ChatERP – Projet fictif – Portfolio

[![Documentation](https://img.shields.io/badge/Documentation-Disponible-blue)](./docs/README.md)
[![Couverture](https://img.shields.io/badge/Couverture-100%25-brightgreen)](./tests/chaterp-tests/coverage-reports/README.md)
[![Kanban](https://img.shields.io/badge/Tableau-Kanban-yellow)](https://github.com/EtiennePaquet85/ChatERP/projects)
[![Accès Cloud](https://img.shields.io/badge/Déployé_via-Render-red)](https://render.com/)
[![Made with SWEBOK](https://img.shields.io/badge/Guidé_par-SWEBOK_V4.0-blueviolet)](https://www.computer.org/education/bodies-of-knowledge/software-engineering)

---

**ChatERP** est un mini ERP open-source développé avec **React**, **.NET 8** et **FastAPI**, selon une architecture en couches rigoureuse conforme au **SWEBOK V4.0 (2024)**.

Ce projet est né d’une **collaboration entre humain et intelligence artificielle** : il est conçu avec l’assistance de ChatGPT (d'où le nom *ChatERP*). 

Il sert à démontrer mes compétences professionnelles acquises lors de ma formation en **Génie Logiciel à l’ÉTS**, incluant :

* L'application rigoureuse de **patrons de conception logiciels** tels que **MVC** et **Adaptateur**
* L’organisation modulaire avec **architecture orientée qualité, testabilité et maintenabilité**
* L’intégration complète de **tests unitaires et d’intégration** pour chaque couche du système
* L’utilisation de **Git**, **GitHub Projects** et d’un **workflow professionnel** de développement

Accéder à l’application en ligne ➜ [ChatERP – www.chaterp.app](https://www.chaterp.app)

---

## 🗂️ Sommaire

1. [🎯 Objectif](#objectif)
2. [🔧 Mise en route](#mise-en-route)
3. [✅ Statut du projet](#statut-du-projet)
4. [🧭 Processus de développement](#processus-de-developpement)
5. [🧾 Analyse des besoins](#analyse-des-besoins)
6. [🏗️ Architecture logicielle](#architecture-logicielle)
7. [🧠 Conception](#conception)
8. [🧱 Construction](#construction)
9. [✅ Tests et validation](#tests-et-validation)
10. [🚀 Déploiement](#deploiement)
11. [🔧 Maintenance](#maintenance)
12. [⚖️ Licence](#licence)
13. [📚 À propos](#a-propos)


---

## 🎯 Objectif

Ce projet a pour but :

* De servir de **portfolio technique professionnel** pour des employeurs ou recruteurs techniques
* De reproduire, à petite échelle, un ERP modulaire comme **Odoo**, basé sur une architecture multi-systèmes
* D’expérimenter, formaliser et documenter les **bonnes pratiques du génie logiciel** en développement réel

---

## 🔧 Mise en route

* Cloner le projet
* Ouvrir le fichier `ChatERP.sln` dans Visual Studio
* Restaurer les dépendances NuGet (clic droit sur la solution > Restaurer)
* Assurez-vous que **.NET 8**, **Node.js 18+**, **Python 3.11+** et **Docker** sont bien installés pour le bon fonctionnement du projet
* Lancer les systèmes `chaterp-web`, `chaterp-server` et `chaterp-persistence` via `chaterp-compose` (voir section [🚀 Déploiement](#deploiement))

---

## ✅ Statut du projet

* ✅ Documentation complète, incluant **analyse**, **conception** et **traçabilité**
* ✅ Structure **multi-systèmes** stable (frontend / backend / database)
* ✅ Pipeline de **tests automatisés** et rapports de couverture par système
* ✅ Module **Employés** terminé (CRUD complet + tests + validation)
* ⬜ Module **Clients** à venir
* ⬜ Module **Produits** à venir
* ⬜ Module **Utilisateurs** à venir
* ⬜ Module **Authentification** à venir

---

## 🧭 Processus de développement

Le projet **ChatERP** repose sur une **démarche rigoureuse, séquentielle et itérative**, inspirée des bonnes pratiques professionnelles définies par le *Software Engineering Body of Knowledge* (**SWEBOK**).  
Chaque étape du développement est documentée de manière traçable et structurée, couvrant l’ensemble du cycle de vie logiciel : de l’analyse des besoins à la maintenance.

### 📚 Référence : [SWEBOK Guide V4.0 – IEEE Computer Society](https://www.computer.org/education/bodies-of-knowledge/software-engineering)

### 🔄 Étapes principales du processus

Le développement suit une **logique de progression interdocumentaire** cohérente.

| Étape                        | Objectif principal                                                                                      |
|------------------------------|---------------------------------------------------------------------------------------------------------|
| **Analyse des besoins**      | Identifier ce que le système doit accomplir selon les attentes fonctionnelles et non fonctionnelles. |
| **Architecture logicielle**  | Définir la structure technique globale satisfaisant les exigences clés.                            |
| **Conception**               | Détailler l’architecture en modules, interfaces et modèles de données concrets.                     |
| **Construction**             | Implémenter le système de manière modulaire, testable et conforme aux standards de qualité.         |
| **Tests & Validation**       | Vérifier que le système fonctionne correctement et satisfait les exigences.                         |
| **Déploiement**              | Mettre en production le système dans un environnement cible contrôlé.                              |
| **Maintenance**              | Assurer l’évolution, la correction et la stabilité du système à long terme.                         |

> 📘 Pour plus de détails, consulter les documents : [0.1-process-overview.md](./docs/software-development-process/0.0-process/0.1-process-overview.md), [0.2-process-traceability.md](./docs/software-development-process/0.0-process/0.2-process-traceability.md)

---

## 🧾 Analyse des besoins

**ChatERP** est un système ERP modulaire destiné à la gestion simplifiée des ressources d’une organisation (employés, clients, produits).  
L’application s’adresse à des utilisateurs professionnels ayant besoin d’un outil clair, rapide et extensible pour les opérations courantes.

### 💼 Fonctionnalités principales

- **Gestion des employés**
  - Créer, modifier, supprimer et consulter les fiches employé.
  - Champs personnalisés : rôle, téléphone, adresse, statut, date d’embauche, photo, etc.
- **Gestion des clients** *(à venir)*
- **Gestion des produits** *(à venir)*

### 🧠 Philosophie

- **Simplicité d’usage** : UI épurée, responsive, accessible.
- **Transparence des données** : tous les traitements sont visibles dans le réseau, via API documentée.
- **Modularité technique** : architecture découplée, chaque brique peut évoluer indépendamment.

### 🧩 Cas d’usage implémentés

| ID          | Titre                             | Priorité   | Statut     |
|-------------|-----------------------------------|------------|------------|
| UCS-UC-01a  | Créer un employé                  | Critique   | ✅ Terminé |
| UCS-UC-01b  | Téléverser une photo d’employé    | Haute      | ✅ Terminé |
| UCS-UC-02a  | Consulter la liste d’employés     | Critique   | ✅ Terminé |
| UCS-UC-02b  | Consulter un employé              | Critique   | ✅ Terminé |
| UCS-UC-03   | Modifier un employé               | Critique   | ✅ Terminé |
| UCS-UC-04   | Supprimer un employé              | Critique   | ✅ Terminé |

> 📘 Pour plus de détails, consulter les documents : [1.1-vision.md](./docs/software-development-process/1.0-requirements/1.1-vision.md), [1.2-requirements.md](./docs/software-development-process/1.0-requirements/1.2-requirements.md), [1.3-use-cases.md](./docs/software-development-process/1.0-requirements/1.3-use-cases.md)

---

## 🏗️ Architecture logicielle

ChatERP adopte une **architecture en couches**, structurée autour de trois systèmes indépendants, chacun responsable d’une fonction claire du système.

### Synthèse des choix d'architecture

| Couche         | Système                  | Technologies principales                          | Rôle                                                           |
|----------------|--------------------------|---------------------------------------------------|----------------------------------------------------------------|
| 🟦 Présentation | Frontend                 | `React (TypeScript)`, React Query, Axios          | Interface utilisateur interactive et typée                     |
| 🟩 Métier       | Backend                  | `ASP.NET Core (C#)`, HttpClient, JSON             | Exécution des cas d’utilisation et logique applicative         |
| 🟨 Données      | Database                 | `FastAPI (Python)`, SQLite, Pydantic              | API REST pour la persistance et validation stricte des données |

🔗 **Communication inter-systèmes via HTTP REST** (ex. : `Frontend → Backend → Database`)  

### Principes clés

⚙️ Cette architecture favorise :
- la **modularité** (chaque composant est indépendant),
- la **testabilité** (tests par service ou bout en bout),
- la **scalabilité** (changement d’implémentation ou déploiement indépendant),
- et la **clarté de responsabilité** entre présentation, métier et données.

> 📘 Pour plus de détails, consulter le document : [2.1-architecture.md](./docs/software-development-process/2.0-architecture/2.1-architecture.md)

---

## 🧠 Conception

L’application **ChatERP** adopte une architecture modulaire et découplée conforme aux principes du **SWEBOK V4.0 (2024)**, répartie en trois systèmes indépendants :

### Synthèse des choix de conception

| Système   | Organisation principale                        | Objectif principal                                       |
|-----------|------------------------------------------------|----------------------------------------------------------|
| Frontend  | `components`, `handlers`, `adapters`           | Isolation UI, validation et communication API            |
| Backend   | `Controllers`, `Services`, `Clients`           | Séparation réception, logique métier, accès aux données  |
| Database  | `routers`, `managers`, `repositories`          | Découpage points d’entrée, logique métier et persistance |

### Principes clés

- Modularité et séparation nette des responsabilités  
- Découplage via interfaces claires et adaptateurs dédiés  
- Maintenabilité assurée par une structuration fonctionnelle cohérente  
- Testabilité facilitée grâce à des composants autonomes et isolés  
- Interopérabilité garantie par des standards ouverts (HTTP REST, JSON)

> 📘 Pour plus de détails, consulter le document : [3.1-design.md](./docs/software-development-process/3.0-design/3.1-design.md)

---

## 🧱 Construction

L’application **ChatERP** applique une construction logicielle rigoureuse conforme aux principes du **SWEBOK V4.0 (2024)**, assurant qualité, testabilité et maintenabilité par une organisation claire et modulaire des trois systèmes indépendants.

### Synthèse des choix de construction

| Système   | Organisation principale                                                    | Objectif principal                                                                 |
|-----------|----------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Frontend  | `EmployeeComponent.tsx`, `employeeHandler.ts`, `httpEmployeeApiAdapter.ts` | Interface utilisateur React, gestion de la logique métier client, validation, orchestration des appels API vers le Backend |
| Backend   | `EmployeeController.cs`, `EmployeeService.cs`, `HttpEmployeeApiClient.cs`  | Réception et validation des requêtes API, traitement métier centralisé, communication HTTP avec la Database              |
| Database  | `employee_router.py`, `employee_manager.py`, `employee_repository.py`      | Exposition des endpoints CRUD via FastAPI, gestion métier locale, accès persistance SQLite                                |

### Principes clés

- **Modularité stricte** entre systèmes et composants.
- **Cohésion forte / couplage faible**.
- **Interopérabilité** totale entre langages et environnements (React, .NET, Python).
- **Testabilité** native (TDD encouragé, structure miroir code/tests).
- **CI/CD automatisé** via scripts Docker, GitHub Actions et outils de couverture.

### Structure modulaire

| Couche        | Dossier racine                          | Rôle principal                                   |
|---------------|-----------------------------------------|--------------------------------------------------|
| Docker        | `docker/`                               | Conteneurisation et orchestration                |
| Documentation | `docs/`                                 | Conception, processus, traçabilité               |
| Scripts       | `scripts/`                              | Automatisation tests, build, déploiement         |
| Backend       | `systems/backend/ChatERP.Server/`       | Logique métier, API, services                    |
| Database      | `systems/database/ChatERP.Persistence/` | API REST CRUD, validation, persistance           |
| Frontend      | `systems/frontend/ChatERP.Web/`         | Interface utilisateur et appels HTTP             |
| Tests         | `tests/ChatERP.Tests/`                  | Tests unitaires et intégration                   |

### Suivi des tâches

**ChatERP** utilise un tableau Kanban GitHub pour organiser, prioriser et suivre les tâches, garantissant une gestion rigoureuse même en développement solo, avec un lien systématique entre tickets, commits et pull requests.

> 🔍 Lien pour accéder au Kanban : [ChatERP - Tableau Kanban](https://github.com/EtiennePaquet85/ChatERP/projects)

### Bonnes pratiques

- **Conventions claires** : nommage idiomatique, validation rigoureuse, aucune donnée sensible publiée.
- **Outils de qualité** : eslint, StyleCop, flake8, SonarQube, vitest, xUnit, pytest.
- **Documentation intégrée** : chaque composant technique est documenté et traçable dans le code.

> 📘 Pour plus de détails, consulter les documents : [4.1-construction.md](./docs/software-development-process/4.0-construction/4.1-construction.md), [4.2-projet-structure.md](./docs/software-development-process/4.0-construction/4.2-projet-structure.md), [4.3-coding-practices.md](./docs/software-development-process/4.0-construction/4.3-coding-practices.md)

---

## ✅ Tests et validation

Le projet **ChatERP** intègre une stratégie de tests complète couvrant trois niveaux :

| Niveau      | Objectif principal                                       |
|-------------|----------------------------------------------------------|
| Unitaire    | Vérifier chaque composant de manière isolée              |
| Intégration | Tester les échanges entre Frontend, Backend, Database    |
| Système     | Valider les cas d’utilisation de bout en bout            |

### 🧪 Technologies utilisées

| Couche    | Outils                     | Répertoire de tests                           |
|-----------|----------------------------|-----------------------------------------------|
| Backend   | .NET 8 + xUnit             | `systems/backend/chaterp-server-tests`        |
| Database  | Python + FastAPI + Pytest  | `systems/database/chaterp-persistence-tests`  |
| Frontend  | React + Vitest             | `systems/frontend/chaterp-web-tests`          |

### 🚀 Exécution des tests

Tous les tests peuvent être lancés en une seule commande :

~~~powershell
powershell -ExecutionPolicy Bypass -File .\scripts\tests\run-all-tests.ps1
~~~

Ou séparément : `dotnet test`, `make test`, `npm run test` — avec ou sans couverture.

> 📄 Pour les rapports de couverture, consulter : [ChatERP – Couverture](./tests/chaterp-tests/coverage-reports/README.md)

### 🔄 Intégration CI/CD

L’outil **`chaterp-compose`** exécute automatiquement tous les tests avant de construire et déployer les images Docker.  
Les tests qui ont échoués bloquent le déploiement, assurant une **haute stabilité du système**.

### ✅ Validation fonctionnelle

Chaque exigence fonctionnelle est validée par des tests associés à des cas d’utilisation mesurables.  
Tous les cas critiques (**Créer**, **Consulter**, **Modifier**, **Supprimer un employé**) sont **déjà validés**.

📄 Pour plus de détails, consulter les documents : [5.1-tests.md](docs/software-development-process/5.0-tests/5.1-tests.md), [5.2-validation.md](docs/software-development-process/5.0-tests/5.2-validation.md)

---

## 🚀 Déploiement

Le déploiement de **ChatERP** est conçu pour être **simple**, **reproductible** et **sécurisé par des tests automatisés**.

### 📦 Modes de déploiement

| Mode                          | Commande principale                             | Utilisation principale                         |
|------------------------------|--------------------------------------------------|------------------------------------------------|
| 🔧 Manuel (sans Docker)       | Lancer chaque service depuis le terminal        | Développement local rapide                     |
| 🐳 Automatique (avec Docker)  | `docker-compose up --build`                     | Déploiement local unifié et isolé              |
| ✅ Validé (`chaterp-compose`) | `dotnet run --project docker/chaterp-compose`   | Pipeline local complet (tests + build + run)   |
| ☁️ Cloud (Render.com)         | Docker Hub + Git via `render.yaml`               | Déploiement continu en développement et production   |

### 🧪 Tests intégrés au pipeline

Avant chaque déploiement via `chaterp-compose`, les tests unitaires et d’intégration sont **automatiquement exécutés**.  
Tout échec bloque le lancement, garantissant une **stabilité élevée** du système.

### 🌍 Accès aux environnements en ligne

Les environnements cloud suivants permettent d’interagir avec l’application **ChatERP** directement via le navigateur :

- **Développement (systèmes séparés)** :
  - 🌐 [Frontend – Interface Web (TypeScript)](https://chaterp-web.onrender.com)
  - 🔄 [Backend – API .NET (C#)](https://chaterp-server.onrender.com)
  - 🗃️ [Database – API FastAPI (Python)](https://chaterp-persistence.onrender.com)

- **Production (application complète)** :
  - 🚀 [ChatERP – www.chaterp.app](https://www.chaterp.app)

📄 Pour plus de détails, consulter le document : [6.1-deployment.md](docs/software-development-process/6.0-deployment/6.1-deployment.md)

---

## 🔧 Maintenance

### Types de maintenance

| Type       | Description                         |
|------------|-----------------------------------|
| Corrective | Correction d’anomalies             |
| Adaptative | Adaptation aux évolutions          |
| Perfective | Amélioration continue              |
| Préventive | Renforcement et tests              |

### Procédure simplifiée

1. Créer un ticket formel `ISSUE-aaaa-mm-DOM-xxx`  
2. Classer par type et priorité (P1, P2, P3)  
3. Travailler sur une branche dédiée (`fix/...` ou `improve/...`)  
4. Lancer les tests (`xUnit`, `Vitest`, `pytest`) et mettre à jour la couverture  
5. Soumettre une Pull Request avec CI/CD via `chaterp-compose`  
6. Valider et déployer avec traçabilité

### Exemple de ticket

| ID        | Type       | Statut    | Description                                  |
|-----------|------------|-----------|----------------------------------------------|
| ISSUE-2025-08-CLI-001 | Perfective | 🕒 À venir | Ajout d'un tri par nom de clients |

📄 Pour plus de détails, consulter le document : [7.1-maintenance.md](docs/software-development-process/7.0-maintenance/7.1-maintenance.md)

---

## ⚖️ Licence

Ce projet est distribué sous la licence **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.

Vous pouvez le partager et le modifier avec attribution, à condition de ne pas en faire un usage commercial.

📄 Pour plus de détails, consulter le document : [LICENSE](./LICENSE)

---

## 📚 À propos

**ChatERP** est un **projet fictif**, conçu dans le cadre d’une démonstration de compétences professionnelles en génie logiciel. Il est destiné à des employeurs ou recruteurs techniques.

Le projet est rigoureusement documenté et n’a **aucune visée commerciale**, ne collecte **aucune donnée**, et **n’est affilié à aucune entreprise réelle portant un nom similaire**.

Développé par **Étienne Paquet**, diplômé en Génie Logiciel de l’ÉTS – Montréal.  

---

© 2025 ChatERP – Projet fictif – Portfolio. Tous droits réservés.
 