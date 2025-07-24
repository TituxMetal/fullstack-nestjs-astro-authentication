# Fullstack Authentication System

[![Node.js](https://img.shields.io/badge/Node.js-22.15.1-green.svg)](https://nodejs.org/)
[![Yarn](https://img.shields.io/badge/Yarn-4.9.1-blue.svg)](https://yarnpkg.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern fullstack authentication system built with NestJS backend and Astro frontend, featuring
**Clean Architecture principles**, JWT authentication, and comprehensive testing infrastructure.

## 🚀 Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework with Clean Architecture implementation
- **Prisma** - Type-safe database ORM with SQLite
- **JWT** - Custom JWT implementation with HTTP-only cookies (NO Passport.js)
- **Argon2** - Industry-standard password hashing
- **Jest** - Comprehensive unit and integration testing

### Frontend

- **Astro 5.x** - Modern static site generator with React integration
- **React** - Component-based UI library
- **Tailwind CSS V4** - Utility-first CSS framework
- **Vitest** - Fast unit testing for frontend components

### Development Tools

- **Turbo** - High-performance monorepo build system
- **TypeScript** - Strict type checking across all workspaces
- **ESLint 9** - Code linting with modern configuration
- **Prettier** - Code formatting with Astro and Tailwind support
- **Husky** - Git hooks for automated quality checks

## 📋 Prerequisites

- **Node.js** v22.15.1 or higher
- **Yarn** v4.9.1 or higher (managed via Corepack)
- **Git** for version control

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TituxMetal/fullstack-nestjs-astro-authentication.git
cd fullstack-nestjs-astro-authentication
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Setup

```bash
# Copy environment template (when available)
cp .env.example .env

# Generate Prisma client
yarn workspace @auth-system/backend prisma generate
```

### 4. Database Setup

```bash
# Run database migrations
yarn workspace @auth-system/backend prisma migrate dev
```

### 5. Validate Setup

```bash
# Run the validation script to ensure everything is working
./scripts/validate-setup.sh
```

### 6. Start Development Servers

```bash
# Start both backend and frontend in development mode
yarn dev

# Or start individually:
yarn workspace @auth-system/backend dev    # Backend on http://localhost:3000
yarn workspace @auth-system/frontend dev   # Frontend on http://localhost:4321
```

## 📁 Project Structure

```tree
├── apps/
│   ├── backend/                 # NestJS backend application
│   │   ├── prisma/             # Database schema and migrations
│   │   └── src/
│   │       ├── auth/           # Authentication module (Clean Architecture)
│   │       │   ├── domain/     # Entities, value objects, interfaces
│   │       │   ├── application/# Use cases and services
│   │       │   └── infrastructure/ # Controllers, repositories, JWT
│   │       ├── shared/         # Shared infrastructure and domain
│   │       └── users/          # Legacy user module (to be removed)
│   └── frontend/               # Astro frontend application
│       ├── public/             # Static assets
│       └── src/
│           ├── components/     # React components
│           ├── layouts/        # Astro layouts
│           ├── pages/          # Astro pages
│           └── styles/         # Global styles
├── packages/
│   ├── eslint-config/          # Shared ESLint configuration
│   ├── shared-types/           # Cross-workspace TypeScript types
│   └── ts-config/              # Shared TypeScript configuration
└── docs/                       # Project documentation
    ├── backend-architecture.md # Backend Clean Architecture overview
    ├── backend-security.md     # Security implementation patterns
    ├── api-specification.md    # REST API contracts and examples
    ├── frontend-architecture.md# Frontend architecture
    ├── frontend-spec.md        # Frontend specifications
    ├── prd.md                  # Product Requirements (source of truth)
    └── shards/                 # Story planning and implementation
```

## 🔧 Available Scripts

### Root Level Scripts

```bash
# Development
yarn dev                        # Start both apps in development mode
yarn build                      # Build all applications
yarn test                       # Run all tests
yarn lint                       # Lint all workspaces
yarn format                     # Format all code with Prettier
yarn type-check                 # Type check all workspaces

# Quality Assurance
yarn clean                      # Clean all build artifacts
yarn reset                      # Clean and reinstall dependencies

# Validation
./scripts/validate-setup.sh     # Validate complete development setup
```

### Backend Scripts

```bash
yarn workspace @auth-system/backend dev         # Start backend dev server
yarn workspace @auth-system/backend build       # Build backend
yarn workspace @auth-system/backend test        # Run backend tests
yarn workspace @auth-system/backend test:watch  # Run tests in watch mode
```

### Frontend Scripts

```bash
yarn workspace @auth-system/frontend dev        # Start frontend dev server
yarn workspace @auth-system/frontend build      # Build frontend
yarn workspace @auth-system/frontend start      # Preview production build
yarn workspace @auth-system/frontend test       # Run frontend tests
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run backend tests only
yarn workspace @auth-system/backend test

# Run frontend tests only
yarn workspace @auth-system/frontend test

# Run tests in watch mode
yarn workspace @auth-system/backend test:watch
yarn workspace @auth-system/frontend test:watch
```

### Test Structure

- **Backend**: Jest with unit tests (domain/application) and integration tests (infrastructure)
- **Frontend**: Vitest with React component testing and integration tests
- **Coverage**: High test coverage requirements (100% domain, 90%+ application, 80%+ infrastructure)

## 🔄 Development Workflow

### Git Hooks (Automated Quality Checks)

The project uses Husky for automated quality checks:

- **Pre-commit**: Runs linting and formatting on staged files only (fast)
- **Pre-push**: Runs comprehensive validation (type-check, tests, build)

### Code Quality Standards

- **TypeScript**: Strict mode enabled across all workspaces
- **ESLint**: Modern ESLint 9 configuration with NestJS and Astro support
- **Prettier**: Consistent code formatting with Astro and Tailwind plugins
- **Path Aliases**:
  - `~/*` for local workspace imports
  - `@auth-system/*` for cross-workspace imports

### Development Process

1. Create feature branch from `main`
2. Make changes with automatic linting and formatting
3. Run tests locally: `yarn test`
4. Commit changes (pre-commit hooks run automatically)
5. Push changes (pre-push hooks run comprehensive validation)
6. Create pull request

## 🚨 Troubleshooting

### Common Issues

#### Node.js Version Mismatch

```bash
# Check your Node.js version
node --version

# Should be v22.15.1 or higher
# Use nvm to switch versions if needed
nvm use 22.15.1
```

#### Yarn Version Issues

```bash
# Check Yarn version
yarn --version

# Should be v4.9.1 (specified in packageManager)
# Yarn is managed by Corepack and packageManager field in package.json
```

#### Database Issues

```bash
# Reset database
yarn workspace @auth-system/backend prisma migrate reset

# Regenerate Prisma client
yarn workspace @auth-system/backend prisma generate
```

#### Build Failures

```bash
# Clean all build artifacts and reinstall dependencies
yarn reset

# Rebuild everything
yarn build
```

#### TypeScript Errors

```bash
# Check types across all workspaces
yarn type-check

# Build TypeScript configurations
yarn workspace @auth-system/ts-config build
```

### Getting Help

1. Check the [documentation](#-documentation) for detailed technical information
2. Review existing issues in the GitHub repository
3. Ensure all prerequisites are correctly installed

## 📚 Documentation

### Architecture & Implementation

- **[backend-architecture.md](./docs/backend-architecture.md)** - Clean Architecture overview and
  design patterns
- **[backend-security.md](./docs/backend-security.md)** - Security implementation and best practices
- **[api-specification.md](./docs/api-specification.md)** - Complete REST API contracts and examples

### Frontend & UX

- **[frontend-architecture.md](./docs/frontend-architecture.md)** - Frontend architecture with Astro
  and React
- **[frontend-spec.md](./docs/frontend-spec.md)** - UI/UX specifications and design system

### Project Management

- **[prd.md](./docs/prd.md)** - Product Requirements Document (source of truth)
- **[shards/](./docs/shards/)** - Story planning and implementation tracking

## 🎯 Project Status

This project is currently in the **Authentication Implementation Phase** with the following
completed:

### ✅ Completed Features

- ✅ Environment setup and monorepo structure
- ✅ TypeScript and linting infrastructure
- ✅ Framework initialization (NestJS + Astro)
- ✅ Git hooks and development workflow
- ✅ **Backend authentication system foundation**
  - ✅ Clean Architecture structure (domain/application/infrastructure)
  - ✅ User registration and login endpoints
  - ✅ JWT token generation and validation
  - ✅ Role-based access control (USER/ADMIN)
  - ✅ Basic testing suite
- ✅ **Complete documentation architecture**

### 🚧 In Progress

- 🚧 **Security implementation** (Argon2 hashing, HTTP-only cookies, rate limiting)
- 🚧 Frontend authentication integration
- 🚧 Production deployment setup
- 🚧 End-to-end testing

### 📋 Next Steps

- **Complete Story 1.3**: Add Argon2 password hashing and HTTP-only JWT cookies
- Frontend authentication forms and state management
- Docker containerization for production (needs story planning)
- CI/CD pipeline setup

## 🔐 Authentication Features

The authentication system foundation includes:

- **Registration & Login**: Email validation and JWT token generation
- **Role-Based Access**: USER and ADMIN roles with guard protection
- **Clean Architecture**: Domain-driven design with strict layer separation

### 🔧 Security Features In Progress

- **Password Security**: Argon2 hashing implementation (Story 1.3)
- **JWT Cookies**: HTTP-only cookies with 24-hour expiration (Story 1.3)
- **Rate Limiting**: Brute force protection on authentication endpoints (Story 1.3)

### API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - Session termination
- `GET /auth/me` - Current user profile

See [api-specification.md](./docs/api-specification.md) for complete API documentation.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
