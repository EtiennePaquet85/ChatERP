# 📊 ChatERP - Couverture des tests Database

Ce guide explique comment **préparer l’environnement**, **nettoyer les anciens rapports**, **lancer les tests avec couverture**, et **générer un rapport HTML interactif** pour le système `Database`.

---

## ⚙️ 1. Préparer l’environnement de test

### 📁 Positionnement requis :  

Toutes les commandes doivent être exécutées depuis le dossier **`chaterp-persistence-tests`**, situé dans `ChatERP/systems/database/` :

- Terminal :  
~~~
cd ChatERP/systems/database/chaterp-persistence-tests
~~~

### ✅ Installer les dépendances Python

Assure-toi que l’environnement virtuel est activé (`.venv`), puis installe les dépendances :

- Terminal :
~~~
python -m venv .venv
source .venv/bin/activate  # sous Bash/Linux/macOS
# ou
.venv\Scripts\activate     # sous PowerShell/Windows

pip install -r requirements.txt
~~~

---

## 🧹 2. Nettoyer les anciens rapports de couverture

Avant de lancer de nouveaux tests, tu peux supprimer les anciens rapports pour éviter toute confusion :

- Terminal :
~~~
make test-clean
~~~

Cette commande supprime les dossiers `.pytest_cache/` et `coverage-report/coverage/`, ainsi que le fichier `.coverage`.

---

## 🧪 3. Lancer les tests avec couverture et générer le rapport HTML

Utilise la commande suivante pour exécuter les tests avec génération automatique du rapport :

- Terminal :
~~~
make test-coverage
~~~

Cette commande :

- Exécute tous les tests définis dans `tests/` avec `pytest`.  
- Calcule la couverture du dossier `database/chaterp-persistence/src/`.  
- Génère un rapport HTML dans `coverage-report/coverage/index.html`.  
- Affiche un résumé de la couverture dans le terminal.

---

### 🔁 Alternative : exécution manuelle (sans utiliser `make test-coverage`)

#### Lancer les tests avec couverture, et générer le rapport HTML

- Terminal :
~~~
pytest --cov=src --cov-report=term-missing --cov-report=html:coverage-report/coverage
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
├── couverture-tests-database.md    # Ce document versionné
~~~

---

## 🔒 6. Git – Gestion du dossier de couverture

Seul le dossier **`coverage`**, situé dans `coverage-report/`, est ignoré dans Git via `.gitignore` afin de :

- Conserver le fichier `couverture-tests-database.md` versionné.  
- Éviter de versionner les fichiers générés automatiquement et volumineux (HTML, assets...).

---

## ✅ 7. Bonnes pratiques & automatisation

- Maintenir une couverture de tests ≥ 90 %.
- Ajouter l'exécution automatique des tests dans le pipeline Docker/Docker Compose.  
- Intégrer l'automatisation dans les pipelines CI/CD (GitHub Actions, Azure DevOps...).   
- Utiliser un badge dans le README pour suivre la couverture.

---

## 📚 8. Références utiles

- [pytest-cov – Documentation](https://pytest-cov.readthedocs.io/)
- Configuration : `pytest.ini`, `Makefile`, `requirements.txt`  
- Code source : `database/chaterp-persistence/src`
- Tests unitaires : `database/chaterp-persistence-tests/tests`
