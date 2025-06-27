# Paycode DRC Fintech Application

## Overview

This is a full-stack fintech application for Paycode DRC, a licensed payment aggregator providing shared, interoperable payment platforms for Financial Institutions across the Democratic Republic of Congo. The application features a modern marketing website showcasing Paycode DRC's role in connecting banks, MFIs, mobile money operators, and other financial players through a unified system, with functionality for demo requests and newsletter subscriptions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom PayCode brand colors and shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between client and server
- **Development**: tsx for TypeScript execution in development

### Build System
- **Frontend**: Vite with React plugin and runtime error overlay
- **Backend**: esbuild for production bundling
- **Development**: Concurrent development server with Vite middleware
- **Deployment**: Static frontend serving with Express API

## Key Components

### Database Schema
- **Demo Requests**: Stores customer demo requests with contact information
- **Newsletter Subscriptions**: Manages email subscriptions with opt-in/out functionality
- **Validation**: Zod schemas ensure data integrity across the stack

### API Endpoints
- `POST /api/demo-requests` - Create new demo requests
- `GET /api/demo-requests` - Retrieve all demo requests
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get newsletter subscriptions

### UI Components
- Custom shadcn/ui components with PayCode branding
- Responsive navigation with mobile menu
- Animated sections with intersection observer triggers
- Form components with validation and error handling
- Statistics counters with animation effects

### Content Sections
- Hero section with parallax background effects
- Value proposition and company overview
- Animated statistics display
- Solutions showcase (Identity, Connectivity, Cost)
- Awards and partnerships display
- Case studies from multiple countries
- Team member profiles
- News and blog articles
- Contact forms for demo requests and newsletter

## Data Flow

1. **User Interaction**: Users interact with forms and navigation elements
2. **Form Submission**: React Hook Form validates data using Zod schemas
3. **API Request**: TanStack Query manages HTTP requests to Express API
4. **Server Processing**: Express routes validate and process requests
5. **Database Operations**: Drizzle ORM handles database interactions
6. **Response Handling**: Success/error states update UI with toast notifications

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Drizzle ORM**: Type-safe database operations
- **Connection Pooling**: Built-in connection management

### UI Libraries
- **Radix UI**: Headless component primitives
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools
- **TypeScript**: Type safety across the stack
- **ESLint**: Code linting and formatting
- **Vite**: Fast development and build tooling

## Deployment Strategy

### Development
- Concurrent development servers for frontend and backend
- Hot module replacement for React components
- TypeScript compilation checking
- Automatic server restart on changes

### Production
- Vite builds optimized frontend bundle
- esbuild creates serverless-compatible backend bundle
- Static assets served from Express
- Environment-based configuration
- Replit deployment with autoscaling

### Environment Configuration
- DATABASE_URL for PostgreSQL connection
- NODE_ENV for environment-specific behavior
- Port configuration for deployment flexibility
