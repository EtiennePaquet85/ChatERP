# 🧪 ChatERP – Tests d’intégration

Ce dossier est dédié aux **tests d’intégration** de l’application **ChatERP**.

Il vise à garantir la **cohérence globale du système**, en validant les **interactions entre les trois sous-systèmes** :  
**Frontend (React/TypeScript)** ⬌ **Backend (.NET 8)** ⬌ **Database (FastAPI/Python)**.

> 🔧 Ces tests simuleront des scénarios réels de bout en bout (ex. : création, modification, suppression d’un employé via l’interface).

---

## 📁 Structure prévue

~~~
integration-tests/
├── README.md                       # Présentation et objectifs des tests
├── scenarios/                      # Cas d’usage transversaux simulés
│   └── test_create_employee.ts     # Exemple de scénario (à venir)
└── utils/                          # Outils et scripts communs
~~~

---

## 📌 Remarques

- Les tests seront intégrés progressivement au fil de l’évolution fonctionnelle.
- Ils pourront être exécutés via `docker-compose` pour tester l’application complète en local ou en CI.
- Les outils prévus incluent : `Playwright`, `Supertest`, ou tout autre framework adapté à chaque couche.

> **Note :** Les fichiers de tests seront ajoutés dans les prochaines phases de développement.
