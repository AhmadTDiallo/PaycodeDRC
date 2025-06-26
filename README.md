# Paycode DRC Fintech Application

**Paycode DRC** is a full-stack fintech platform designed to provide a shared, interoperable payment system for Financial Institutions across the Democratic Republic of Congo. As a licensed payment aggregator, Paycode DRC enables seamless connections between banks, MFIs, mobile money operators, and other financial players through a unified system. The platform includes a modern marketing website, showcasing Paycode DRC's role, with functionality for demo requests and newsletter subscriptions.

---

## 🚀 Features

- Interoperable payment infrastructure for financial institutions
- Modern, responsive marketing website with Paycode DRC branding
- Animated sections, smooth transitions, and interactive UI components
- Forms for demo requests and newsletter subscriptions
- Secure, scalable, full-stack architecture

---

## 🛠️ System Architecture

### Frontend

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for optimized builds and fast development
- **Styling:** Tailwind CSS with Paycode DRC's brand colors, shadcn/ui components
- **State Management:** TanStack Query (React Query) for API state
- **Routing:** Wouter for lightweight client-side routing
- **Animations:** Framer Motion for smooth UI transitions
- **Forms:** React Hook Form with Zod validation for robust form handling

---

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for API endpoints
- **Database:** Drizzle ORM with Neon Database (serverless PostgreSQL)
- **Validation:** Shared Zod schemas for strong data integrity

---

## 🗄️ Database Schema

- **Demo Requests:** Stores demo request submissions with contact details
- **Newsletter Subscriptions:** Manages email subscriptions with opt-in/out functionality

---

## 🌐 API Endpoints

| Method | Endpoint               | Description                       |
|--------|------------------------|------------------------------------|
| POST   | `/api/demo-requests`    | Submit a new demo request          |
| GET    | `/api/demo-requests`    | Retrieve all demo requests         |
| POST   | `/api/newsletter`       | Subscribe to the newsletter        |
| GET    | `/api/newsletter`       | Get all newsletter subscriptions   |

---

## 🎨 UI Highlights

- Responsive navigation with mobile support
- Animated hero section with parallax background
- Value propositions, solution highlights, and company overview
- Animated statistics counters
- Case studies and partnerships showcase
- Team profiles and blog sections
- Interactive forms with real-time validation and toast notifications

---

## 🔄 Data Flow Overview

1. User interacts with forms and navigation
2. React Hook Form + Zod validate user input
3. API requests managed via TanStack Query
4. Express backend validates and processes requests
5. Drizzle ORM interacts with Neon Database
6. UI updates with success/error states

---

## 🔧 External Dependencies

- **Database:** Neon (serverless PostgreSQL), Drizzle ORM
- **UI Libraries:** Tailwind CSS, Radix UI, Framer Motion, Lucide React
- **Development Tools:** TypeScript, ESLint, Vite, esbuild, tsx

---

## 🚢 Deployment Strategy

### Development

- Hot module replacement with Vite
- Concurrent frontend and backend development servers
- Automatic server restarts on code changes

### Production

- Vite builds optimized frontend bundle
- esbuild produces serverless-ready backend bundle
- Static assets served via Express API
- Replit hosting with autoscaling
- Environment-based configuration management

---

## ⚙️ Environment Configuration
Refer to AhmadDiallo
