# Paycode DRC - Fintech Platform

Une plateforme fintech complète pour la République Démocratique du Congo, servant d'agrégateur de paiements licencié avec des plateformes de paiement partagées et interopérables pour les institutions financières.

## 🌟 Aperçu

Paycode DRC est une application web full-stack moderne qui présente les services de l'entreprise, avec des capacités de demandes de démonstration, d'abonnements à la newsletter, et un système complet de gestion d'administration. L'application met en vedette la technologie brevetée EDAPT (Electronic Data And Payments Technology) avec des visualisations 3D immersives.

## 🚀 Fonctionnalités Principales

### 🎨 Interface Utilisateur
- **Design Responsive** : Optimisé pour mobile-first avec adaptation parfaite de 320px au desktop
- **Animations Avancées** : Utilise Framer Motion pour des transitions fluides et interactions 3D
- **Glassmorphisme** : Effets de verre moderne avec backdrop-blur et transparences
- **Thème Sombre Professionnel** : Palette de couleurs bleu foncé cohérente
- **Support Bilingue** : Interface complète Français/Anglais avec commutation dynamique

### 🔧 Technologie EDAPT
- **Page Dédiée EDAPT** : Section autonome avec design parallax et effets immersifs
- **Visualisation 3D** : Dispositif d'enregistrement d'empreintes digitales avec animations flottantes
- **Navigation Minimaliste** : Logo d'empreinte digitale avec sélecteur de langue uniquement
- **Statistiques Interactives** : Compteurs animés avec déclencheurs d'intersection observer

### 🗄️ Gestion de Contenu
- **Interface Admin Complète** : Dashboard avec authentification sécurisée
- **Gestion d'Articles** : Création, édition, publication/dépublication d'actualités
- **Modal Magazine** : Affichage des articles avec design de magazine moderne
- **Slider Horizontal** : Section actualités restructurée avec fonctionnalité de slider

### 📊 Système de Base de Données
- **PostgreSQL avec Neon** : Base de données cloud serverless avec pooling de connexions
- **Drizzle ORM** : ORM TypeScript type-safe avec schémas Zod partagés
- **Migrations Automatisées** : Gestion des schémas avec `drizzle-kit push`
- **Stockage Persistant** : Toutes les données sauvegardées de façon permanente

## 🏗️ Architecture Technique

### Frontend
```
Framework: React 18 + TypeScript + Vite
Styling: Tailwind CSS + shadcn/ui (style "new-york")
State: TanStack Query (React Query)
Routing: Wouter (client-side routing léger)
Animations: Framer Motion
Forms: React Hook Form + Zod validation
UI: shadcn/ui avec branding personnalisé PayCode
```

### Backend
```
Runtime: Node.js + TypeScript + tsx
Framework: Express.js (API RESTful)
Database: PostgreSQL (Neon Database) + Drizzle ORM
Validation: Schémas Zod partagés client/serveur
Sessions: connect-pg-simple (sessions PostgreSQL)
Build: esbuild (production), Vite middleware (développement)
```

### Build System
```
Frontend: Vite + plugin React + overlay erreurs runtime
Backend: esbuild (format ESM)
Development: Serveurs concurrents avec intégration middleware Vite
Deployment: Frontend statique + backend API Express
```

## 📁 Structure du Projet

```
paycode-drc/
├── client/                     # Application React frontend
│   ├── src/
│   │   ├── components/         # Composants UI réutilisables
│   │   │   ├── ui/            # Composants shadcn/ui
│   │   │   ├── edapt.tsx      # Section EDAPT (page principale)
│   │   │   ├── navigation.tsx  # Navigation principale
│   │   │   ├── hero-section.tsx
│   │   │   ├── solutions.tsx
│   │   │   ├── statistics.tsx
│   │   │   ├── news.tsx
│   │   │   ├── contact.tsx
│   │   │   └── footer.tsx
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── home.tsx       # Page d'accueil
│   │   │   ├── edapt.tsx      # Page autonome EDAPT
│   │   │   └── not-found.tsx
│   │   ├── contexts/          # Contextes React
│   │   │   └── LanguageContext.tsx
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── lib/               # Utilitaires et configuration
│   │   └── main.tsx
│   └── index.html
├── server/                     # Backend Express
│   ├── db.ts                  # Configuration base de données
│   ├── index.ts               # Point d'entrée serveur
│   ├── routes.ts              # Routes API
│   ├── storage.ts             # Interface stockage + implémentation
│   ├── sendgrid.ts            # Configuration email
│   └── vite.ts                # Intégration Vite
├── shared/                     # Code partagé
│   └── schema.ts              # Schémas Drizzle + Zod
├── scripts/                    # Scripts utilitaires
│   ├── create-admin.js
│   └── create-superadmin.js
├── attached_assets/            # Ressources multimédia
│   ├── fingerregister_*.avif  # Image dispositif empreintes
│   └── *.jpg, *.webp         # Autres images
└── README.md                   # Documentation projet
```

## 🛠️ Installation et Configuration

### Prérequis
- Node.js 18+ 
- PostgreSQL (ou accès Neon Database)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd paycode-drc

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# DATABASE_URL pour la connexion PostgreSQL
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Le serveur démarre sur http://localhost:5000
# Frontend + Backend sur le même port avec middleware Vite
```

### Base de Données
```bash
# Pousser les changements de schéma
npm run db:push

# Créer un administrateur
node scripts/create-admin.js

# Créer un super administrateur  
node scripts/create-superadmin.js
```

## 📊 Schéma de Base de Données

### Tables Principales
```sql
demo_requests          # Demandes de démonstration client
├── id (serial)
├── name (varchar)
├── email (varchar)
├── company (varchar)
├── phone (varchar)
├── message (text)
└── created_at (timestamp)

newsletter_subscriptions # Abonnements newsletter
├── id (serial)
├── email (varchar, unique)
└── created_at (timestamp)

news_articles          # Articles d'actualités
├── id (serial)
├── title (varchar)
├── content (text)
├── excerpt (text)
├── published (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)

admin_users           # Utilisateurs administrateurs
├── id (serial)
├── username (varchar, unique)
├── password_hash (varchar)
├── role (varchar)
├── created_at (timestamp)
└── updated_at (timestamp)
```

## 🎨 Design System

### Palette de Couleurs
```css
/* Couleurs Principales PayCode */
--paycode-blue: hsl(225, 85%, 35%)      /* Bleu principal */
--paycode-blue-light: hsl(225, 83%, 55%) /* Bleu clair */
--paycode-blue-accent: hsl(225, 70%, 68%) /* Accent bleu */
--paycode-gray: hsl(225, 20%, 65%)       /* Gris neutre */

/* Thème Sombre */
--background: hsl(225, 45%, 10%)         /* Arrière-plan */
--foreground: hsl(210, 40%, 95%)         /* Texte principal */
--card: hsl(225, 40%, 15%)               /* Cartes */
--border: hsl(225, 30%, 30%)             /* Bordures */
```

### Typographie
- **Headers** : Inter/Poppins (font-bold)
- **Body** : Inter (font-normal)
- **Accents** : Montserrat (font-semibold)

### Responsive Breakpoints
```css
sm: 640px   /* Mobile large */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🌐 API Endpoints

### Demandes de Démonstration
```http
POST /api/demo-requests    # Créer demande
GET  /api/demo-requests    # Lister demandes (admin)
```

### Newsletter
```http
POST /api/newsletter       # S'abonner
GET  /api/newsletter       # Lister abonnés (admin)
```

### Actualités
```http
GET    /api/news           # Lister articles
POST   /api/news           # Créer article (admin)
GET    /api/news/:id       # Obtenir article
PUT    /api/news/:id       # Modifier article (admin)
DELETE /api/news/:id       # Supprimer article (admin)
PATCH  /api/news/:id/toggle # Publier/dépublier (admin)
```

### Administration
```http
POST /api/auth/login       # Connexion admin
POST /api/auth/logout      # Déconnexion admin
GET  /api/auth/me          # Profil utilisateur
```

## 🔒 Sécurité

### Authentification
- **Sessions PostgreSQL** : Stockage sessions avec connect-pg-simple
- **Hash Passwords** : bcryptjs pour hachage sécurisé
- **Validation** : Schémas Zod côté client et serveur
- **CORS** : Configuration Express sécurisée

### Validation des Données
- **Côté Client** : React Hook Form + Zod
- **Côté Serveur** : Validation Zod avant base de données
- **Sanitisation** : Nettoyage automatique des entrées

## 📱 Optimisations Mobile

### Responsive Design
- **Navigation Compacte** : Menu hamburger avec overlay
- **Typographie Adaptative** : text-sm à text-8xl selon l'écran
- **Grilles Flexibles** : grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- **Espacement Intelligent** : py-16 md:py-24, px-4 lg:px-8

### Performance
- **Images Optimisées** : object-contain avec max-height contrôlé
- **Animations Légères** : Framer Motion avec will-change
- **Lazy Loading** : Intersection Observer pour animations
- **Bundle Splitting** : Vite code splitting automatique

## 🚀 Déploiement

### Variables d'Environnement
```env
DATABASE_URL=postgresql://...  # URL base de données PostgreSQL
NODE_ENV=production           # Environnement de production
PORT=5000                     # Port serveur (optionnel)
```

### Build Production
```bash
# Build frontend + backend
npm run build

# Le frontend est construit dans dist/public
# Le backend est bundlé dans dist/server
```

### Déploiement
- **Build automatisé** : Frontend statique + API Express
- **Variables d'environnement** : Configuration PostgreSQL
- **HTTPS** : TLS automatique
- **Monitoring** : Vérifications de santé intégrées

## 📈 Fonctionnalités Avancées

### Animations et Interactions
- **Parallax** : Effet de profondeur sur page EDAPT
- **3D Transforms** : preserve-3d pour dispositifs flottants
- **Micro-interactions** : Hover states et tap feedback
- **Intersection Observer** : Animations au scroll

### Internationalisation
- **Context API** : Gestion d'état de langue
- **Commutation Dynamique** : FR/EN sans rechargement
- **Fallbacks** : Textes par défaut si traduction manquante
- **localStorage** : Persistance préférence langue

### SEO et Performance
- **Meta Tags** : Descriptions et Open Graph
- **Semantic HTML** : Structure accessible
- **Core Web Vitals** : Optimisations LCP, FID, CLS
- **Progressive Enhancement** : Fonctionne sans JavaScript

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement avec HMR
npm run build        # Build production
npm run preview      # Prévisualiser build
npm run db:push      # Migrations base de données
npm run type-check   # Vérification TypeScript
```



## 🤝 Contribution

### Standards de Code
- **TypeScript** : Types stricts activés
- **ESLint** : Configuration recommandée React
- **Prettier** : Formatage automatique
- **Conventional Commits** : Messages de commit structurés

### Workflow
1. Fork du repository
2. Créer branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commits avec messages descriptifs
4. Tests des changements
5. Pull request avec description détaillée

## 📄 Licence

Ce projet est sous licence propriétaire. Tous droits réservés à Paycode DRC.



---

**Construit avec ❤️ pour l'écosystème fintech de la RDC**