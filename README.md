# Gestion Tâche

Application web moderne de gestion de tâches avec tableau Kanban, conçue pour aider les équipes à organiser, suivre et collaborer sur leurs projets.

## Fonctionnalités

- **Tableau Kanban** : Visualisez et gérez vos tâches selon leur statut (À faire, En cours, Terminé)
- **Gestion des priorités** : Définissez la priorité de chaque tâche (Basse, Moyenne, Haute)
- **Assignation des tâches** : Attribuez des tâches à un ou plusieurs membres de l'équipe
- **Gestion d'équipe** : Invitez et gérez les membres de votre équipe
- **Authentification** : Système de connexion sécurisé avec gestion des tokens
- **Interface responsive** : Design adapté aux mobiles et ordinateurs

## Technologies

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles
- **React Router** - Routage côté client
- **React Query** - Gestion de l'état serveur
- **React Hook Form + Zod** - Gestion et validation des formulaires

## Prérequis

- Node.js (v16 ou supérieur)
- npm ou bun

## Installation

```bash
# Cloner le dépôt
git clone <URL_DU_DEPOT>
cd TASK_MANAGEMENT_FRONT

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run test` | Lance les tests |
| `npm run test:watch` | Lance les tests en mode watch |

## Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── ui/              # Composants shadcn/ui
│   ├── KanbanBoard.tsx  # Tableau Kanban
│   ├── TaskCard.tsx     # Carte de tâche
│   └── ...
├── pages/               # Pages de l'application
│   ├── Dashboard.tsx    # Tableau de bord principal
│   ├── Team.tsx         # Gestion de l'équipe
│   ├── Login.tsx        # Page de connexion
│   └── ...
├── contexts/            # Contextes React
│   └── AuthContext.tsx  # Gestion de l'authentification
├── hooks/               # Hooks personnalisés
├── lib/                 # Utilitaires
│   ├── api.ts           # Client API
│   └── utils.ts         # Fonctions utilitaires
├── types/               # Définitions TypeScript
└── test/                # Tests
```

## Routes

| Route | Description |
|-------|-------------|
| `/login` | Page de connexion |
| `/register` | Page d'inscription |
| `/dashboard` | Tableau de bord avec Kanban |
| `/team` | Gestion des membres de l'équipe |
| `/invitations` | Gestion des invitations |
| `/settings` | Paramètres utilisateur |

## Configuration

L'application utilise les fichiers de configuration suivants :

- `vite.config.ts` - Configuration Vite (port 8080)
- `tailwind.config.ts` - Configuration Tailwind CSS
- `tsconfig.json` - Configuration TypeScript
- `components.json` - Configuration shadcn/ui

## API

L'application communique avec une API backend via le préfixe `/api`. Les endpoints principaux sont :

- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `GET /tasks` - Liste des tâches
- `POST /tasks` - Créer une tâche
- `PUT /tasks/:id` - Modifier une tâche
- `DELETE /tasks/:id` - Supprimer une tâche
- `GET /users` - Liste des utilisateurs

## Licence

Ce projet est sous licence privée.
