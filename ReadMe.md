# 🌿 Terre & Sens — Projet Full Stack

## 🎯 Objectif

Ce projet final de la formation **Développeur Web Full Stack** vise à créer un site vitrine pour **Terre & Sens**, une initiative dédiée à la biodiversité locale. Il permet de démontrer les compétences acquises en front-end, back-end, base de données, API, déploiement, accessibilité et sécurité.

---

## 🛠️ Stack technique

- **Front-end** : HTML5, CSS (Bootstrap 5), JavaScript vanilla ou React
- **Back-end** : Node.js + Express
- **Base de données** : MySQL (Sequelize) ou MongoDB (Mongoose)
- **Authentification** : JWT + rôles (Admin, Éditeur)
- **Paiement** : Stripe Checkout ou HelloAsso
- **Email** : SendGrid ou Mailgun
- **Déploiement** : Netlify/Vercel (front) + Render/Railway ou OVH
- **Analytics** : Matomo auto-hébergé ou Google Analytics minimal

---

## 📆 Feuille de route pédagogique

| Semaine | Objectifs |
|--------|-----------|
| 1 | Wireframes Figma, arborescence, fiches espèces, photos |
| 2 | Intégration des pages statiques |
| 3 | Composants réutilisables |
| 4 | API Express CRUD + connexion DB |
| 5 | Intégration front ↔ back + filtres dynamiques |
| 6 | Formulaire bénévolat + système admin |
| 7 | Paiement test + emails de confirmation |
| 8 | Tests, optimisation, déploiement, README final

---

## ✅ Checklist initiale

- [x] Initialiser repo Git (branches `main` / `dev`)
- [x] Créer `.gitignore` et `README.md`
- [ ] Structurer les dossiers `client/` et `server/`
- [ ] Configurer `.env.example`
- [ ] Implémenter endpoint `/api/species`
- [ ] Préparer scripts de déploiement

---

## 📁 Arborescence projet (prévisionnelle)
terre-et-sens/
├── client/         # Partie front-end (ce que voit l'utilisateur)
│   ├── index.html  # Page d'accueil principale
│   ├── assets/     # Images, icônes, polices, styles CSS
│   └── js/         # Fichiers JavaScript (interactions, filtres, etc.)
├── server/         # Partie back-end (ce que gère le serveur)
│   ├── routes/         # Définition des routes API (ex: /api/species)
│   ├── models/         # Modèles de données (ex: fiche espèce)
│   └── controllers/    # Logique métier (ex: filtrage, validation)
├── .gitignore      # Fichier qui dit à Git quels fichiers ignorer (ex: node_modules, .env)
├── README.md       # Documentation du projet (objectif, stack, roadmap…)
└── .env.example    # Exemple de fichier de configuration (.env) sans données sensibles

---

## 📌 Bonnes pratiques attendues

- Code clair, commenté, structuré
- Navigation accessible (clavier, contrastes, labels)
- Validation côté serveur + sécurité (XSS, SQLi)
- Audit Lighthouse ≥ 85 sur mobile
- RGPD conforme + analytics minimal
- Documentation complète (README, scripts, guide admin)

---

## 👩‍💻 Auteur

**Lysa** — Développeuse Web Full Stack  
📍 Occitanie, France  
🌐 Projet réalisé dans le cadre de la formation développeur web
# Terre_et_Sens
