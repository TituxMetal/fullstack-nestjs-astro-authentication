# Fullstack Authentication System

[![Node.js](https://img.shields.io/badge/Node.js-22.15.1-green.svg)](https://nodejs.org/)
[![Yarn](https://img.shields.io/badge/Yarn-4.9.1-blue.svg)](https://yarnpkg.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern fullstack authentication system built with NestJS backend and Astro frontend, featuring
hexagonal architecture, JWT authentication, and comprehensive testing infrastructure.

## 🚀 Technology Stack

### Backend

- **NestJS** - Progressive Node.js framework with hexagonal architecture
- **Prisma** - Type-safe database ORM with SQLite
- **JWT** - Cookie-based authentication with Argon2 password hashing
- **Jest** - Comprehensive unit testing framework

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
- **Yarn** v4.9.1 or higher
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

```
├── apps/
│   ├── backend/                 # NestJS backend application
│   │   ├── prisma/             # Database schema and migrations
│   │   └── src/
│   │       ├── shared/         # Shared infrastructure and domain
│   │       └── users/          # User domain module
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
└── memory-bank/                # Project documentation and context
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

- **Backend**: Jest with comprehensive unit tests for domain entities, use cases, and infrastructure
- **Frontend**: Vitest with React component testing and integration tests
- **Coverage**: Test coverage reports available for both applications

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
# Yarn is managed by packageManager field in package.json
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

1. Check the [SPEC.md](./SPEC.md) for detailed technical documentation
2. Review the `memory-bank/` folder for project context and decisions
3. Check existing issues in the GitHub repository
4. Ensure all prerequisites are correctly installed

## 📚 Documentation

- **[SPEC.md](./SPEC.md)** - Technical specifications and architecture details
- **[memory-bank/](./memory-bank/)** - Project context, decisions, and progress tracking

## 🎯 Project Status

This project is currently in the **Foundation Phase** with the following completed:

- ✅ Environment setup and monorepo structure
- ✅ TypeScript and linting infrastructure
- ✅ Framework initialization (NestJS + Astro)
- ✅ Git hooks and development workflow
- 🚧 Project documentation (in progress)

Next phases will focus on implementing the authentication system with user registration, login, and
JWT token management.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
