# Paycode Fintech Congo  - Fintech Platform - Diallo

A comprehensive fintech platform for the Democratic Republic of Congo, serving as a licensed payment aggregator with shared, interoperable payment platforms for financial institutions.

## 🌟 Overview

Paycode DRC is a modern full-stack web application that showcases the company's services, with capabilities for demo requests, newsletter subscriptions, and a complete administration management system. The application features the patented EDAPT (Electronic Data And Payments Technology) technology with immersive 3D visualizations.

## 🚀 Key Features

### 🎨 User Interface
- **Responsive Design** : Mobile-first optimized with perfect adaptation from 320px to desktop
- **Advanced Animations** : Uses Framer Motion for smooth transitions and 3D interactions
- **Glassmorphism** : Modern glass effects with backdrop-blur and transparency
- **Professional Dark Theme** : Consistent dark blue color palette
- **Bilingual Support** : Complete French/English interface with dynamic switching

### 🔧 EDAPT Technology
- **Dedicated EDAPT Page** : Standalone section with parallax design and immersive effects
- **3D Visualization** : Fingerprint registration device with floating animations
- **Minimalist Navigation** : Fingerprint logo with language selector only
- **Interactive Statistics** : Animated counters with intersection observer triggers

### 🗄️ Content Management
- **Complete Admin Interface** : Dashboard with secure authentication
- **Article Management** : Creation, editing, publishing/unpublishing of news
- **Magazine Modal** : Article display with modern magazine design
- **Horizontal Slider** : News section restructured with slider functionality

### 📊 Database System
- **PostgreSQL with Neon** : Serverless cloud database with connection pooling
- **Drizzle ORM** : Type-safe TypeScript ORM with shared Zod schemas
- **Automated Migrations** : Schema management with `drizzle-kit push`
- **Persistent Storage** : All data permanently saved

## 🏗️ Technical Architecture

### Frontend
```
Framework: React 18 + TypeScript + Vite
Styling: Tailwind CSS + shadcn/ui (style "new-york")
State: TanStack Query (React Query)
Routing: Wouter (lightweight client-side routing)
Animations: Framer Motion
Forms: React Hook Form + Zod validation
UI: shadcn/ui with custom PayCode branding
```

### Backend
```
Runtime: Node.js + TypeScript + tsx
Framework: Express.js (RESTful API)
Database: PostgreSQL (Neon Database) + Drizzle ORM
Validation: Shared Zod schemas client/server
Sessions: connect-pg-simple (PostgreSQL sessions)
Build: esbuild (production), Vite middleware (development)
```

### Build System
```
Frontend: Vite + React plugin + runtime error overlay
Backend: esbuild (ESM format)
Development: Concurrent servers with Vite middleware integration
Deployment: Static frontend + Express API backend
```

## 📁 Project Structure

```
paycode-drc/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── edapt.tsx      # EDAPT section (main page)
│   │   │   ├── navigation.tsx  # Main navigation
│   │   │   ├── hero-section.tsx
│   │   │   ├── solutions.tsx
│   │   │   ├── statistics.tsx
│   │   │   ├── news.tsx
│   │   │   ├── contact.tsx
│   │   │   └── footer.tsx
│   │   ├── pages/             # Application pages
│   │   │   ├── home.tsx       # Home page
│   │   │   ├── edapt.tsx      # Standalone EDAPT page
│   │   │   └── not-found.tsx
│   │   ├── contexts/          # React contexts
│   │   │   └── LanguageContext.tsx
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities and configuration
│   │   └── main.tsx
│   └── index.html
├── server/                     # Express backend
│   ├── db.ts                  # Database configuration
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API routes
│   ├── storage.ts             # Storage interface + implementation
│   ├── sendgrid.ts            # Email configuration
│   └── vite.ts                # Vite integration
├── shared/                     # Shared code
│   └── schema.ts              # Drizzle + Zod schemas
├── scripts/                    # Utility scripts
│   ├── create-admin.js
│   └── create-superadmin.js
├── attached_assets/            # Media resources
│   ├── fingerregister_*.avif  # Fingerprint device image
│   └── *.jpg, *.webp         # Other images
└── README.md                   # Project documentation
```

## 🛠️ Installation and Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL (or Neon Database access)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd paycode-drc

# Install dependencies
npm install

# Configure environment variables
# DATABASE_URL for PostgreSQL connection
```

### Development
```bash
# Start development server
npm run dev

# Server starts on http://localhost:5000
# Frontend + Backend on same port with Vite middleware
```

### Database
```bash
# Push schema changes
npm run db:push

# Create an administrator
node scripts/create-admin.js

# Create a super administrator  
node scripts/create-superadmin.js
```

## 📊 Database Schema

### Main Tables
```sql
demo_requests          # Client demo requests
├── id (serial)
├── name (varchar)
├── email (varchar)
├── company (varchar)
├── phone (varchar)
├── message (text)
└── created_at (timestamp)

newsletter_subscriptions # Newsletter subscriptions
├── id (serial)
├── email (varchar, unique)
└── created_at (timestamp)

news_articles          # News articles
├── id (serial)
├── title (varchar)
├── content (text)
├── excerpt (text)
├── published (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)

admin_users           # Administrator users
├── id (serial)
├── username (varchar, unique)
├── password_hash (varchar)
├── role (varchar)
├── created_at (timestamp)
└── updated_at (timestamp)
```

## 🎨 Design System

### Color Palette
```css
/* PayCode Primary Colors */
--paycode-blue: hsl(225, 85%, 35%)      /* Primary blue */
--paycode-blue-light: hsl(225, 83%, 55%) /* Light blue */
--paycode-blue-accent: hsl(225, 70%, 68%) /* Blue accent */
--paycode-gray: hsl(225, 20%, 65%)       /* Neutral gray */

/* Dark Theme */
--background: hsl(225, 45%, 10%)         /* Background */
--foreground: hsl(210, 40%, 95%)         /* Primary text */
--card: hsl(225, 40%, 15%)               /* Cards */
--border: hsl(225, 30%, 30%)             /* Borders */
```

### Typography
- **Headers** : Inter/Poppins (font-bold)
- **Body** : Inter (font-normal)
- **Accents** : Montserrat (font-semibold)

### Responsive Breakpoints
```css
sm: 640px   /* Large mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

## 🌐 API Endpoints

### Demo Requests
```http
POST /api/demo-requests    # Create request
GET  /api/demo-requests    # List requests (admin)
```

### Newsletter
```http
POST /api/newsletter       # Subscribe
GET  /api/newsletter       # List subscribers (admin)
```

### News
```http
GET    /api/news           # List articles
POST   /api/news           # Create article (admin)
GET    /api/news/:id       # Get article
PUT    /api/news/:id       # Update article (admin)
DELETE /api/news/:id       # Delete article (admin)
PATCH  /api/news/:id/toggle # Publish/unpublish (admin)
```

### Administration
```http
POST /api/auth/login       # Admin login
POST /api/auth/logout      # Admin logout
GET  /api/auth/me          # User profile
```

## 🔒 Security

### Authentication
- **PostgreSQL Sessions** : Session storage with connect-pg-simple
- **Password Hashing** : bcryptjs for secure hashing
- **Validation** : Zod schemas on client and server
- **CORS** : Secure Express configuration

### Data Validation
- **Client Side** : React Hook Form + Zod
- **Server Side** : Zod validation before database
- **Sanitization** : Automatic input cleaning

## 📱 Mobile Optimizations

### Responsive Design
- **Compact Navigation** : Hamburger menu with overlay
- **Adaptive Typography** : text-sm to text-8xl based on screen
- **Flexible Grids** : grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
- **Smart Spacing** : py-16 md:py-24, px-4 lg:px-8

### Performance
- **Optimized Images** : object-contain with controlled max-height
- **Lightweight Animations** : Framer Motion with will-change
- **Lazy Loading** : Intersection Observer for animations
- **Bundle Splitting** : Automatic Vite code splitting

## 🚀 Deployment

### Environment Variables
```env
DATABASE_URL=postgresql://...  # PostgreSQL database URL
NODE_ENV=production           # Production environment
PORT=5000                     # Server port (optional)
```

### Production Build
```bash
# Build frontend + backend
npm run build

# Frontend is built to dist/public
# Backend is bundled to dist/server
```

### Deployment
- **Automated Build** : Static frontend + Express API
- **Environment Variables** : PostgreSQL configuration
- **HTTPS** : Automatic TLS
- **Monitoring** : Built-in health checks

## 📈 Advanced Features

### Animations and Interactions
- **Parallax** : Depth effect on EDAPT page
- **3D Transforms** : preserve-3d for floating devices
- **Micro-interactions** : Hover states and tap feedback
- **Intersection Observer** : Scroll-triggered animations

### Internationalization
- **Context API** : Language state management
- **Dynamic Switching** : FR/EN without reload
- **Fallbacks** : Default texts if translation missing
- **localStorage** : Language preference persistence

### SEO and Performance
- **Meta Tags** : Descriptions and Open Graph
- **Semantic HTML** : Accessible structure
- **Core Web Vitals** : LCP, FID, CLS optimizations
- **Progressive Enhancement** : Works without JavaScript

## 🔧 Available Scripts

```bash
npm run dev          # Development with HMR
npm run build        # Production build
npm run preview      # Preview build
npm run db:push      # Database migrations
npm run type-check   # TypeScript checking
```



## 🤝 Contributing

### Code Standards
- **TypeScript** : Strict types enabled
- **ESLint** : React recommended configuration
- **Prettier** : Automatic formatting
- **Conventional Commits** : Structured commit messages

### Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commits with descriptive messages
4. Test changes
5. Pull request with detailed description

## 📄 License

This project is under proprietary license. All rights reserved to Paycode DRC.
Any inquiries please refer to Ahmad Tidiane Diallo. 
