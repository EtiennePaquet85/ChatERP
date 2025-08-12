# 📊 ChatERP - Couverture des tests Frontend

Ce guide explique comment **préparer l’environnement**, **nettoyer les anciens rapports**, **lancer les tests avec couverture**, et **générer un rapport HTML interactif** pour le système `Frontend`.

---

## ⚙️ 1. Préparer l’environnement de test

### 📁 Positionnement requis :

Toutes les commandes doivent être exécutées depuis le dossier **`chaterp-web-tests`**, situé dans `ChatERP/systems/frontend/` :

- Terminal :
~~~
cd ChatERP/systems/frontend/chaterp-web-tests
~~~

### ✅ Installer les dépendances Node.js

Assure-toi que Node.js et npm sont installés, puis installe les dépendances :

- Terminal :
~~~
npm install
~~~

---

## 🧹 2. Nettoyer les anciens rapports de couverture

Avant de lancer de nouveaux tests, tu peux supprimer les anciens rapports pour éviter toute confusion :

- Terminal :
~~~
npm run test:clean
~~~

Cette commande supprime le dossier `coverage-report/coverage/` qui contient les rapports HTML générés.

---

## 🧪 3. Lancer les tests avec couverture et générer le rapport HTML

Utilise la commande suivante pour exécuter les tests avec génération automatique du rapport :

- Terminal :
~~~
npm run test:coverage
~~~

Cette commande :

- Exécute tous les tests définis dans `tests/` avec `vitest`.  
- Calcule la couverture du dossier `frontend/chaterp-web/src/`.
- Génère un rapport HTML dans `coverage-report/coverage/index.html`.
- Affiche un résumé de la couverture dans le terminal.

---

### 🔁 Alternative : exécution manuelle (sans utiliser `npm run test:coverage`)

#### Lancer les tests avec couverture, et générer le rapport HTML

- Terminal :
~~~
npx vitest run --coverage
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
├── couverture-tests-frontend.md    # Ce document versionné
~~~

---

## 🔒 6. Git – Gestion du dossier de couverture

Seul le dossier **`coverage`**, situé dans `coverage-report/`, est ignoré dans Git via `.gitignore` afin de :

- Conserver le fichier `couverture-tests-frontend.md` versionné.
- Éviter de versionner les fichiers générés automatiquement et volumineux (HTML, assets...).

---

## ✅ 7. Bonnes pratiques & automatisation

- Maintenir une couverture de tests ≥ 90 %.
- Ajouter l'exécution automatique des tests dans le pipeline Docker/Docker Compose.
- Intégrer l'automatisation dans les pipelines CI/CD (GitHub Actions, Azure DevOps...).
- Utiliser un badge dans le README pour suivre la couverture.

---

## 📚 8. Références utiles

- [Vitest – Documentation](https://vitest.dev/guide/)
- Configuration : `vitest.config.ts`, `tsconfig.json`, `package.json`  
- Code source : `frontend/chaterp-web/src`
- Tests unitaires : `frontend/chaterp-web-tests/tests`
