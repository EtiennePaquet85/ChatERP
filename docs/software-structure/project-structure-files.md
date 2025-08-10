# 🌳 ChatERP - Arborescence du projet avec fichiers

Voici la structure simplifiée du projet ChatERP, montrant les principaux dossiers et fichiers.  
Cette organisation facilite le développement, les tests, la documentation, et le déploiement.

---

## 🌳 Arborescence simplifiée avec fichiers

Voici la structure actuelle du projet, incluant les dossiers et fichiers principaux :

~~~  
ChatERP/
    ├── docker/
    │   ├── chaterp-compose/
    │   │   ├── chaterp-compose.csproj
    │   │   ├── chaterp-compose.csproj.user
    │   │   └── Program.cs
    │   └── docker-compose.yml
    ├── docs/
    │   ├── software-development-process/
    │   │   ├── 0.0-process/
    │   │   │   ├── 0.1-process-overview.md
    │   │   │   └── 0.2-process-traceability.md
    │   │   ├── 1.0-requirements/
    │   │   │   ├── 1.1-vision.md
    │   │   │   ├── 1.2-requirements.md
    │   │   │   └── 1.3-use-cases.md
    │   │   ├── 2.0-architecture/
    │   │   │   └── 2.1-architecture.md
    │   │   ├── 3.0-design/
    │   │   │   └── 3.1-design.md
    │   │   ├── 4.0-construction/
    │   │   │   ├── 4.1-construction.md
    │   │   │   ├── 4.2-projet-structure.md
    │   │   │   └── 4.3-coding-practices.md
    │   │   ├── 5.0-tests/
    │   │   │   ├── 5.1-tests.md
    │   │   │   └── 5.2-validation.md
    │   │   ├── 6.0-deployment/
    │   │   │   └── 6.1-deployment.md
    │   │   └── 7.0-maintenance/
    │   │       └── 7.1-maintenance.md
    │   ├── software-diagrams/
    │   │   ├── 1.0-requirements/
    │   │   │   └── use-cases-diagram.puml
    │   │   ├── 2.0-architecture/
    │   │   │   └── deployment-diagram.puml
    │   │   ├── 3.0-design/
    │   │   │   └── component-diagram.puml
    │   │   └── 4.0-construction/
    │   │       ├── class-diagram-uc01a.puml
    │   │       ├── class-diagram-uc01b.puml
    │   │       ├── class-diagram-uc02a.puml
    │   │       ├── class-diagram-uc02b.puml
    │   │       ├── class-diagram-uc03.puml
    │   │       ├── class-diagram-uc04.puml
    │   │       ├── sequence-diagram-uc01a.puml
    │   │       ├── sequence-diagram-uc01b.puml
    │   │       ├── sequence-diagram-uc02a.puml
    │   │       ├── sequence-diagram-uc02b.puml
    │   │       ├── sequence-diagram-uc03.puml
    │   │       └── sequence-diagram-uc04.puml
    │   ├── software-structure/
    │   │   ├── project-structure-files.md
    │   │   └── project-structure-folders.md
    │   ├── software-tools/
    │   │   └── project-tools-overview.md
    │   └── README.md
    ├── scripts/
    │   ├── structure/
    │   │   ├── generate-project-structure-files.ps1
    │   │   └── generate-project-structure-folders.ps1
    │   └── tests/
    │       ├── run-all-tests.ps1
    │       ├── run-backend-tests.ps1
    │       ├── run-database-tests.ps1
    │       └── run-frontend-tests.ps1
    ├── systems/
    │   ├── backend/
    │   │   ├── chaterp-server/
    │   │   │   ├── src/
    │   │   │   │   ├── Clients/
    │   │   │   │   │   ├── HttpEmployeeApiClient.cs
    │   │   │   │   │   └── IEmployeeApiClient.cs
    │   │   │   │   ├── Controllers/
    │   │   │   │   │   └── EmployeesController.cs
    │   │   │   │   ├── DTOs/
    │   │   │   │   │   └── EmployeeDtos.cs
    │   │   │   │   └── Services/
    │   │   │   │       ├── EmployeeService.cs
    │   │   │   │       └── IEmployeeService.cs
    │   │   │   ├── appsettings.Development.json
    │   │   │   ├── appsettings.json
    │   │   │   ├── chaterp-server.csproj
    │   │   │   ├── Dockerfile
    │   │   │   └── Program.cs
    │   │   └── chaterp-server-tests/
    │   │       ├── .config/
    │   │       │   └── dotnet-tools.json
    │   │       ├── coverage-report/
    │   │       │   └── couverture-tests-backend.md
    │   │       ├── nupkg/
    │   │       │   ├── test-clean.1.0.0.nupkg
    │   │       │   └── test-coverage.1.0.0.nupkg
    │   │       ├── scripts/
    │   │       │   ├── clean-coverage-report.ps1
    │   │       │   ├── generate-coverage-report.ps1
    │   │       │   ├── update-test-clean-tool.ps1
    │   │       │   └── update-test-coverage-tool.ps1
    │   │       ├── tests/
    │   │       │   ├── Clients/
    │   │       │   │   └── README.md
    │   │       │   ├── Controllers/
    │   │       │   │   ├── EmployeesController.Tests.UC01a.cs
    │   │       │   │   ├── EmployeesController.Tests.UC01b.cs
    │   │       │   │   ├── EmployeesController.Tests.UC02a.cs
    │   │       │   │   ├── EmployeesController.Tests.UC02b.cs
    │   │       │   │   ├── EmployeesController.Tests.UC03.cs
    │   │       │   │   └── EmployeesController.Tests.UC04.cs
    │   │       │   ├── Services/
    │   │       │   │   └── README.md
    │   │       │   └── AssemblyInfo.cs
    │   │       ├── tools/
    │   │       │   ├── test-clean/
    │   │       │   │   ├── Program.cs
    │   │       │   │   └── test-clean.csproj
    │   │       │   └── test-coverage/
    │   │       │       ├── Program.cs
    │   │       │       └── test-coverage.csproj
    │   │       ├── chaterp-server-tests.csproj
    │   │       ├── coverlet.runsettings
    │   │       └── NuGet.config
    │   ├── database/
    │   │   ├── chaterp-persistence/
    │   │   │   ├── data/
    │   │   │   │   ├── photos/
    │   │   │   │   │   ├── employee_15d73eeb32c64d5db7b8b6396084ec91.png
    │   │   │   │   │   ├── employee_34abd5c8b8e2431597dd46b8f9e97bbf.png
    │   │   │   │   │   ├── employee_4ce211527e424da6845881791f8cfa44.png
    │   │   │   │   │   ├── employee_500d93d97c98482c8445f95ede5052f9.png
    │   │   │   │   │   ├── employee_5550dce4b8be49b5909dff692a730722.png
    │   │   │   │   │   ├── employee_66a79368511a4ec0b6fc229018cc2c52.png
    │   │   │   │   │   ├── employee_820e517326ee4879b7aab94ef42beeb8.png
    │   │   │   │   │   ├── employee_84646d134be945ef8fcb59c9d6fdab4c.png
    │   │   │   │   │   ├── employee_a11db129e6c5411a8cf24b89861b3737.png
    │   │   │   │   │   ├── employee_bc76ab21bf9b4ae391629679d7344af5.png
    │   │   │   │   │   ├── employee_ec4270d5c44547ac92515d668c8f3dbd.png
    │   │   │   │   │   └── employee_f1e9addf249e43f9b15af6cac63004f2.png
    │   │   │   │   └── employees.db
    │   │   │   ├── scripts/
    │   │   │   │   ├── create_employees_db.py
    │   │   │   │   └── read_employees_db.py
    │   │   │   ├── src/
    │   │   │   │   ├── managers/
    │   │   │   │   │   ├── __init__.py
    │   │   │   │   │   └── employee_manager.py
    │   │   │   │   ├── repositories/
    │   │   │   │   │   ├── __init__.py
    │   │   │   │   │   └── employee_repository.py
    │   │   │   │   ├── routers/
    │   │   │   │   │   ├── __init__.py
    │   │   │   │   │   └── employee_router.py
    │   │   │   │   ├── schemas/
    │   │   │   │   │   ├── __init__.py
    │   │   │   │   │   └── employee_schemas.py
    │   │   │   │   └── __init__.py
    │   │   │   ├── .env
    │   │   │   ├── .flake8
    │   │   │   ├── Dockerfile
    │   │   │   ├── main.py
    │   │   │   ├── Makefile
    │   │   │   ├── mypy.ini
    │   │   │   ├── pyproject.toml
    │   │   │   └── requirements.txt
    │   │   └── chaterp-persistence-tests/
    │   │       ├── .pytest_cache/
    │   │       │   ├── v/
    │   │       │   │   └── cache/
    │   │       │   │       └── nodeids
    │   │       │   ├── .gitignore
    │   │       │   ├── CACHEDIR.TAG
    │   │       │   └── README.md
    │   │       ├── coverage-report/
    │   │       │   └── couverture-tests-database.md
    │   │       ├── tests/
    │   │       │   ├── __init__.py/
    │   │       │   ├── managers/
    │   │       │   │   └── README.md
    │   │       │   ├── repositories/
    │   │       │   │   └── README.md
    │   │       │   ├── routers/
    │   │       │   │   ├── __init__.py/
    │   │       │   │   ├── test_employee_router_uc01a.py
    │   │       │   │   ├── test_employee_router_uc01b.py
    │   │       │   │   ├── test_employee_router_uc02a.py
    │   │       │   │   ├── test_employee_router_uc02b.py
    │   │       │   │   ├── test_employee_router_uc03.py
    │   │       │   │   └── test_employee_router_uc04.py
    │   │       │   └── conftest.py
    │   │       ├── Makefile
    │   │       ├── pytest.ini
    │   │       └── requirements.txt
    │   └── frontend/
    │       ├── chaterp-web/
    │       │   ├── public/
    │       │   │   ├── fonts/
    │       │   │   │   ├── Caveat/
    │       │   │   │   │   ├── Caveat-Bold.ttf
    │       │   │   │   │   ├── Caveat-Bold.woff
    │       │   │   │   │   ├── Caveat-Bold.woff2
    │       │   │   │   │   ├── Caveat-Medium.ttf
    │       │   │   │   │   ├── Caveat-Medium.woff
    │       │   │   │   │   ├── Caveat-Medium.woff2
    │       │   │   │   │   ├── Caveat-Regular.ttf
    │       │   │   │   │   ├── Caveat-Regular.woff
    │       │   │   │   │   ├── Caveat-Regular.woff2
    │       │   │   │   │   ├── Caveat-SemiBold.ttf
    │       │   │   │   │   ├── Caveat-SemiBold.woff
    │       │   │   │   │   └── Caveat-SemiBold.woff2
    │       │   │   │   └── Comfortaa/
    │       │   │   │       ├── Comfortaa-Bold.ttf
    │       │   │   │       ├── Comfortaa-Bold.woff
    │       │   │   │       ├── Comfortaa-Bold.woff2
    │       │   │   │       ├── Comfortaa-Light.ttf
    │       │   │   │       ├── Comfortaa-Light.woff
    │       │   │   │       ├── Comfortaa-Light.woff2
    │       │   │   │       ├── Comfortaa-Medium.ttf
    │       │   │   │       ├── Comfortaa-Medium.woff
    │       │   │   │       ├── Comfortaa-Medium.woff2
    │       │   │   │       ├── Comfortaa-Regular.ttf
    │       │   │   │       ├── Comfortaa-Regular.woff
    │       │   │   │       ├── Comfortaa-Regular.woff2
    │       │   │   │       ├── Comfortaa-SemiBold.ttf
    │       │   │   │       ├── Comfortaa-SemiBold.woff
    │       │   │   │       └── Comfortaa-SemiBold.woff2
    │       │   │   ├── images/
    │       │   │   │   └── default-avatar.png
    │       │   │   └── vite.svg
    │       │   ├── scripts/
    │       │   │   └── clean-employees-css-classes.js
    │       │   ├── src/
    │       │   │   ├── adapters/
    │       │   │   │   ├── httpEmployeeApiAdapter.ts
    │       │   │   │   └── iEmployeeApiAdapter.ts
    │       │   │   ├── assets/
    │       │   │   │   └── react.svg
    │       │   │   ├── components/
    │       │   │   │   ├── EmployeeComponent.tsx
    │       │   │   │   ├── EmployeeForm.tsx
    │       │   │   │   ├── EmployeeList.tsx
    │       │   │   │   ├── Features.tsx
    │       │   │   │   ├── Footer.tsx
    │       │   │   │   ├── Header.tsx
    │       │   │   │   ├── Hero.tsx
    │       │   │   │   ├── Spinner.tsx
    │       │   │   │   └── Testimonials.tsx
    │       │   │   ├── constants/
    │       │   │   │   ├── employeeConstants.ts
    │       │   │   │   └── sharedConstants.ts
    │       │   │   ├── handlers/
    │       │   │   │   └── employeeHandler.ts
    │       │   │   ├── pages/
    │       │   │   │   ├── ContactPage.tsx
    │       │   │   │   ├── EmployeesPage.tsx
    │       │   │   │   ├── HomePage.tsx
    │       │   │   │   └── TrialPage.tsx
    │       │   │   ├── styles/
    │       │   │   │   ├── buttons.css
    │       │   │   │   ├── cards.css
    │       │   │   │   ├── contact.css
    │       │   │   │   ├── employees.css
    │       │   │   │   ├── fonts.css
    │       │   │   │   ├── globals.css
    │       │   │   │   ├── layout.css
    │       │   │   │   ├── reset.css
    │       │   │   │   ├── spinner.css
    │       │   │   │   └── variables.css
    │       │   │   ├── types/
    │       │   │   │   ├── employeeTypes.ts
    │       │   │   │   └── sharedTypes.ts
    │       │   │   ├── utils/
    │       │   │   │   └── httpClient.ts
    │       │   │   ├── App.tsx
    │       │   │   ├── index.css
    │       │   │   ├── main.tsx
    │       │   │   └── vite-env.d.ts
    │       │   ├── .env
    │       │   ├── .gitignore
    │       │   ├── Dockerfile
    │       │   ├── eslint.config.js
    │       │   ├── index.html
    │       │   ├── nginx.conf
    │       │   ├── package.json
    │       │   ├── package-lock.json
    │       │   ├── README.md
    │       │   ├── tsconfig.app.json
    │       │   ├── tsconfig.json
    │       │   ├── tsconfig.node.json
    │       │   ├── tsconfig.test.tsbuildinfo
    │       │   └── vite.config.ts
    │       └── chaterp-web-tests/
    │           ├── coverage-report/
    │           │   └── couverture-tests-frontend.md
    │           ├── tests/
    │           │   ├── adapters/
    │           │   │   └── README.md
    │           │   ├── components/
    │           │   │   └── README.md
    │           │   ├── handlers/
    │           │   │   ├── employeeHandler.uc01a.test.ts
    │           │   │   ├── employeeHandler.uc01b.test.ts
    │           │   │   ├── employeeHandler.uc02a.test.ts
    │           │   │   ├── employeeHandler.uc02b.test.ts
    │           │   │   ├── employeeHandler.uc03.test.ts
    │           │   │   └── employeeHandler.uc04.test.ts
    │           │   └── pages/
    │           │       └── README.md
    │           ├── .env.test
    │           ├── package.json
    │           ├── package-lock.json
    │           ├── tsconfig.json
    │           └── vitest.config.ts
    ├── tests/
    │   └── chaterp-tests/
    │       ├── coverage-reports/
    │       │   └── README.md
    │       ├── integration-tests/
    │       │   └── README.md
    │       ├── unit-tests/
    │       │   └── README.md
    │       └── chaterp-tests.csproj
    ├── .gitignore
    ├── ChatERP.sln
    ├── CODEOWNERS
    ├── LICENSE
    ├── README.md
    └── render.yaml
~~~
