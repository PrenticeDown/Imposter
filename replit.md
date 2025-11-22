# Imposter Party Game

## Overview

A web-based party game application where players receive secret roles (Imposter or Crewmate) and attempt to identify imposters through social deduction. The app handles game setup, player name collection, and role distribution, with the actual gameplay (discussion and voting) happening offline among players. Built as a mobile-first, single-device experience where players pass the device to secretly view their roles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Shadcn/ui components built on top of Radix UI primitives, providing accessible, customizable components following Material Design principles. The design emphasizes touch-first interactions with large tap targets (minimum 48px) and clear visual hierarchy.

**Styling**: Tailwind CSS with custom theming via CSS variables. The design system uses the "New York" Shadcn style variant with custom spacing (Roboto font, specific border radius values, and Material Design-inspired elevation system).

**State Management**: React useState hooks for local component state. The application follows a three-phase flow (player setup → theme/imposter config → role reveal) with back navigation support. State is managed in the main Home component with proper persistence between screens.

**Routing**: Wouter for lightweight client-side routing, though the current implementation is a single-page app.

**Data Flow**: Unidirectional data flow where parent components pass configuration down and receive completion callbacks. Game state is computed in the Home component and passed to child components.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**Development vs Production**: Separate entry points with Vite middleware integration for development (hot module replacement) and static file serving for production builds.

**API Design**: RESTful API structure (routes prefixed with `/api`), though currently minimal as the game logic runs entirely client-side with no persistence.

**Storage Layer**: In-memory storage implementation (MemStorage class) with an abstraction interface (IStorage) that could be swapped for database-backed storage. Currently includes basic User CRUD operations as boilerplate.

**Logging**: Custom logging middleware that captures request paths, durations, and JSON responses for API routes.

### Core Game Logic

**Random Assignment Algorithm**: Fisher-Yates shuffle to randomly distribute imposter roles among players, ensuring fair and unpredictable role assignment.

**Word Selection**: Users select from 12 themed word lists (Party, Celebrities, R18, Movies, Animals, Food, Sports, Locations, Jobs, Gaming, Technology, Romance) via a dropdown selector. Each theme contains ~50 main/hint word pairs. The game randomly selects one word pair, giving crewmates the main word (e.g., "Titanic") and imposters the hint word (e.g., "Iceberg") when enabled, or null when disabled.

**Privacy Design**: Role reveals use a timed modal (4-second countdown) that auto-closes to prevent shoulder surfing when players pass the device.

### Data Schema

**Game Configuration**: Player count (3-10), imposter count (1 to n-1), and hint word toggle stored in a validated Zod schema.

**Player Model**: Each player has a name, role (crewmate/imposter), and optional word. Players are stored as an array in game state.

**Validation**: Zod schemas ensure player count constraints, unique names, and valid imposter counts before game creation.

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Headless, accessible component primitives (@radix-ui/* packages for accordion, dialog, dropdown, switch, etc.)
- **Shadcn/ui**: Pre-styled components built on Radix UI following the "New York" design system
- **Lucide React**: Icon library for UI elements (Shield, Users, ArrowLeft, etc.)
- **Class Variance Authority**: Type-safe component variant styling
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **cmdk**: Command menu component (installed but not actively used)

### React Ecosystem
- **React 18**: Core UI library with concurrent features
- **Wouter**: Lightweight routing alternative to React Router
- **React Hook Form**: Form state management with Zod resolver integration
- **@tanstack/react-query**: Server state management (installed but minimal usage in current client-only implementation)

### Development & Build Tools
- **Vite**: Fast build tool and development server with HMR
- **TypeScript**: Static typing throughout the codebase
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Database & ORM (Configured but Unused)
- **Drizzle ORM**: PostgreSQL ORM with Zod integration
- **@neondatabase/serverless**: Neon serverless Postgres driver
- **Database Schema**: Defined in shared/schema.ts but not actively used; app currently runs entirely client-side with no persistence

### Server Dependencies
- **Express.js**: Web server framework
- **connect-pg-simple**: PostgreSQL session store (configured but unused in current implementation)

### Utilities
- **Zod**: Schema validation for game configuration and forms
- **date-fns**: Date manipulation library
- **clsx & tailwind-merge**: Utility for conditional className management
- **nanoid**: Unique ID generation

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation tools
- **@replit/vite-plugin-dev-banner**: Development environment indicator