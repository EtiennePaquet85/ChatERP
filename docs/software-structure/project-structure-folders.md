# 🌳 ChatERP - Arborescence du projet sans fichiers

Voici la structure simplifiée du projet ChatERP, montrant les principaux dossiers.  
Cette organisation facilite le développement, les tests, la documentation, et le déploiement.

---

## 🌳 Arborescence simplifiée sans fichiers

Voici la structure actuelle du projet, incluant les dossiers principaux :

~~~
ChatERP/
    ├── docker/
    │   └── chaterp-compose/
    ├── docs/
    │   ├── software-development-process/
    │   │   ├── 0.0-process/
    │   │   ├── 1.0-requirements/
    │   │   ├── 2.0-architecture/
    │   │   ├── 3.0-design/
    │   │   ├── 4.0-construction/
    │   │   ├── 5.0-tests/
    │   │   ├── 6.0-deployment/
    │   │   └── 7.0-maintenance/
    │   ├── software-diagrams/
    │   │   ├── 1.0-requirements/
    │   │   ├── 2.0-architecture/
    │   │   ├── 3.0-design/
    │   │   └── 4.0-construction/
    │   ├── software-structure/
    │   └── software-tools/
    ├── scripts/
    │   ├── structure/
    │   └── tests/
    ├── systems/
    │   ├── backend/
    │   │   ├── chaterp-server/
    │   │   │   └── src/
    │   │   │       ├── Clients/
    │   │   │       ├── Controllers/
    │   │   │       ├── DTOs/
    │   │   │       └── Services/
    │   │   └── chaterp-server-tests/
    │   │       ├── .config/
    │   │       ├── coverage-report/
    │   │       ├── nupkg/
    │   │       ├── scripts/
    │   │       ├── tests/
    │   │       │   ├── Clients/
    │   │       │   ├── Controllers/
    │   │       │   └── Services/
    │   │       └── tools/
    │   │           └── test-coverage/
    │   ├── database/
    │   │   ├── chaterp-persistence/
    │   │   │   ├── data/
    │   │   │   │   └── photos/
    │   │   │   ├── scripts/
    │   │   │   └── src/
    │   │   │       ├── managers/
    │   │   │       ├── repositories/
    │   │   │       ├── routers/
    │   │   │       └── schemas/
    │   │   └── chaterp-persistence-tests/
    │   │       ├── .pytest_cache/
    │   │       │   └── v/
    │   │       │       └── cache/
    │   │       ├── coverage-report/
    │   │       └── tests/
    │   │           ├── __init__.py/
    │   │           ├── managers/
    │   │           ├── repositories/
    │   │           └── routers/
    │   │               └── __init__.py/
    │   └── frontend/
    │       ├── chaterp-web/
    │       │   ├── public/
    │       │   │   ├── fonts/
    │       │   │   │   ├── Caveat/
    │       │   │   │   └── Comfortaa/
    │       │   │   └── images/
    │       │   ├── scripts/
    │       │   └── src/
    │       │       ├── adapters/
    │       │       ├── assets/
    │       │       ├── components/
    │       │       ├── constants/
    │       │       ├── handlers/
    │       │       ├── pages/
    │       │       ├── styles/
    │       │       ├── types/
    │       │       └── utils/
    │       └── chaterp-web-tests/
    │           ├── coverage-report/
    │           └── tests/
    │               ├── adapters/
    │               ├── components/
    │               ├── handlers/
    │               └── pages/
    └── tests/
        └── chaterp-tests/
            └── integration-tests/
~~~
