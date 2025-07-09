# Paycode DRC Fintech Application

## Overview

Paycode DRC is a full-stack fintech platform designed as a licensed payment aggregator providing shared, interoperable payment platforms for Financial Institutions across the Democratic Republic of Congo. The application serves as a marketing website showcasing the company's services, with capabilities for demo requests and newsletter subscriptions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development server and optimized production builds
- **Styling**: Tailwind CSS with custom PayCode brand colors and shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactive UI elements
- **Forms**: React Hook Form with Zod validation for robust form handling
- **UI Components**: shadcn/ui components configured with "new-york" style and custom branding

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL (configured for Neon Database)
- **Validation**: Zod schemas shared between client and server for data consistency
- **Development**: tsx for TypeScript execution in development mode
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Build System
- **Frontend**: Vite with React plugin and runtime error overlay for development
- **Backend**: esbuild for production bundling with ESM format
- **Development**: Concurrent development with Vite middleware integration
- **Deployment**: Static frontend serving with Express API backend

## Key Components

### Database Schema (PostgreSQL via Drizzle ORM)
- **Demo Requests**: Stores customer demo requests with contact information (name, email, company, phone, message)
- **Newsletter Subscriptions**: Manages email subscriptions with opt-in/out functionality and unique email constraint
- **Validation**: Zod schemas ensure data integrity and validation across the entire stack

### API Endpoints
- `POST /api/demo-requests` - Create new demo requests with validation
- `GET /api/demo-requests` - Retrieve all demo requests
- `POST /api/newsletter` - Subscribe to newsletter with duplicate email handling
- `GET /api/newsletter` - Get newsletter subscriptions

### UI Components
- Custom shadcn/ui components with PayCode DRC branding
- Responsive navigation with mobile hamburger menu
- Animated hero section with parallax effects
- Statistics counters with intersection observer triggers
- Team member profiles with social media links
- News articles section with category filtering
- Contact forms with real-time validation and success states

## Data Flow

1. **User Interaction**: Users interact with React components (forms, navigation)
2. **Form Validation**: Client-side validation using React Hook Form + Zod schemas
3. **API Requests**: TanStack Query manages API calls to Express backend
4. **Server Validation**: Express routes validate requests using shared Zod schemas
5. **Database Operations**: Drizzle ORM handles PostgreSQL operations with type safety
6. **Response Handling**: JSON responses with success/error states returned to frontend
7. **UI Updates**: React Query automatically updates UI based on API responses

## External Dependencies

### Core Technologies
- **Database**: Neon Database (serverless PostgreSQL)
- **Fonts**: Google Fonts (Inter, Poppins, Montserrat)
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions

### Development Tools
- **TypeScript**: Full-stack type safety
- **ESLint/Prettier**: Code quality and formatting
- **PostCSS**: CSS processing with Tailwind CSS
- **Replit Integration**: Runtime error overlay and cartographer for development

### Third-party Services
- Email validation and newsletter management (backend storage only)
- Image hosting via Unsplash for placeholder content
- Social media integration (LinkedIn profiles)

## Deployment Strategy

### Development Environment
- **Hot Module Replacement**: Vite HMR with Express middleware integration
- **TypeScript Compilation**: tsx for server-side TypeScript execution
- **Error Handling**: Runtime error overlay for development debugging
- **Database**: Neon Database with connection pooling

### Production Environment
- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles backend
- **Static Serving**: Express serves static files from build output
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Session Storage**: PostgreSQL-backed sessions for user state
- **Error Handling**: Centralized error middleware with JSON responses

### Database Management
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)
- **Connection**: @neondatabase/serverless for edge-compatible database access
- **Schema**: Centralized schema definitions in `shared/schema.ts`

## Changelog

```
Changelog:
- July 09, 2025. PostgreSQL database integration completed with Neon Database
- July 09, 2025. DatabaseStorage implementation replaced MemStorage for persistent data
- July 09, 2025. Demo requests and newsletter subscriptions now saved permanently
- July 09, 2025. Migration from Replit Agent to Replit environment completed
- July 09, 2025. Complete French translation of the website interface  
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language in French.
Website language: French (all UI text translated from English to French)
```