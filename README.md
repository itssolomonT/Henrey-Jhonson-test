# SafeHaven Security Systems - Full Stack Developer Exercise

## Overview

This is a comprehensive solution for SafeHaven Security Systems, a multi-brand home security company operating across 6 Southeastern states. The application demonstrates scalable architecture, mobile-first design, and enterprise-grade features.

## Architecture & Technical Approach

### Frontend
- **React 18** with TypeScript for type safety
- **Next.js 14** for server-side rendering and optimal performance
- **Tailwind CSS** for responsive, mobile-first design
- **Framer Motion** for smooth animations
- **React Query** for efficient data fetching and caching

### Backend
- **Node.js** with Express for API development
- **TypeScript** for type safety across the stack
- **PostgreSQL** for relational data storage
- **Redis** for session management and caching
- **Prisma** as ORM for database operations

### Key Features

#### 1. Multi-Brand Architecture
- Dynamic brand detection and routing
- Brand-specific styling, content, and CTAs
- Scalable design system supporting 30+ brands

#### 2. ZIP Code Routing
- Automatic location detection
- Service area validation
- Brand assignment based on ZIP codes

#### 3. Lead Attribution & Tracking
- Session persistence with Redis
- UTM parameter tracking
- Call source attribution
- Return visitor recognition

#### 4. API Integrations
- Google Maps API for location services
- Weather API for local conditions
- Geolocation services

#### 5. Mobile-First Design
- Responsive design optimized for mobile
- Touch-friendly interactions
- Fast loading times with Next.js optimization

## Project Structure

```
safehaven-security/
├── frontend/                 # Next.js React application
├── backend/                  # Express API server
├── shared/                   # Shared types and utilities
├── docs/                     # Documentation and slides
└── docker/                   # Docker configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL
- Redis

### Installation

1. Clone the repository
2. Run `docker-compose up -d` to start databases
3. Install dependencies: `npm install`
4. Set up environment variables
5. Run development servers:
   - Frontend: `npm run dev:frontend`
   - Backend: `npm run dev:backend`

## Deployment

The application is designed for easy deployment with:
- Docker containerization
- Environment-based configuration
- CI/CD pipeline support
- Scalable cloud architecture

## Brand Configuration

The system supports dynamic brand configuration through:
- Brand-specific themes and colors
- Custom content and CTAs
- Regional service areas
- Local phone numbers and contact info

## Performance & Scalability

- Server-side rendering for fast initial loads
- Image optimization and lazy loading
- Database indexing for quick queries
- Redis caching for session management
- CDN-ready static assets

## Security Features

- Input validation and sanitization
- CORS configuration
- Rate limiting
- Session security
- Environment variable protection 