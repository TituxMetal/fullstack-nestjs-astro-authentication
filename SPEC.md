# Technical Specifications

This document outlines the key technical decisions, architectural patterns, and design rationale for
the Fullstack Authentication System.

## 🏗️ Architecture Decisions

### Backend: NestJS with Hexagonal Architecture

**Decision**: NestJS framework implementing hexagonal (ports and adapters) architecture pattern
**Rationale**:

- **NestJS**: Enterprise-grade Node.js framework with built-in dependency injection, decorators, and
  modular structure
- **Hexagonal Architecture**: Separates business logic from external concerns within NestJS modules
- **Perfect Match**: NestJS modules naturally support hexagonal layers through dependency injection
- **Scalability**: NestJS provides the framework structure while hexagonal architecture ensures
  clean business logic

**Implementation**:

- **Domain Layer**: Pure TypeScript classes with business logic
- **Application Layer**: NestJS services with use cases and orchestration
- **Infrastructure Layer**: NestJS controllers, repositories, and external service integrations

### Frontend: Astro with React Islands

**Decision**: Astro as the meta-framework with selective React hydration **Rationale**:

- Static generation for optimal performance
- Minimal JavaScript bundle size
- Progressive enhancement approach
- SEO-friendly by default

**Implementation**:

- Static pages for content and layouts
- React components only for interactive features
- Server-side rendering with client-side hydration where needed

### Database: SQLite with Prisma

**Decision**: SQLite with Prisma as ORM **Rationale**:

- Zero-configuration database setup
- Type-safe database operations
- Single-file database for simplicity

### Monorepo: Turbo + Yarn Workspaces

**Decision**: Monorepo with Turbo for build orchestration **Rationale**:

- Shared code and types between frontend/backend
- Efficient builds with dependency caching
- Simplified development workflow
- Consistent tooling across projects

## 🔧 Technical Patterns

### Repository Pattern

**Purpose**: Abstract database operations from business logic **Implementation**: Interface in
domain, concrete implementation in infrastructure **Benefit**: Testable business logic, swappable
data sources

### NestJS Dependency Injection

**Purpose**: Loose coupling between components and clean architecture layers **Implementation**:
NestJS built-in DI container with decorators (@Injectable, @Inject) **Benefit**:

- Testable code with easy mocking
- Configurable dependencies
- Automatic resolution of complex dependency graphs
- Perfect integration with hexagonal architecture patterns

### Error Handling Strategy

**Domain Errors**: Business rule violations (WeakPasswordError, UserAlreadyExistsError)
**Infrastructure Errors**: Technical failures (DatabaseError, NetworkError) **HTTP Errors**:
Transformed by exception filters for consistent API responses

### Type Safety Across Workspaces

**Shared Types Package**: Common interfaces and DTOs **Path Aliases**: Consistent import patterns
**TypeScript Strict Mode**: Maximum type safety

## 🧪 Testing Strategy

### Backend Testing Philosophy

- **Unit Tests**: Domain entities, services, and repositories with mocked dependencies

### Frontend Testing Philosophy

- **Component Tests**: React components in isolation
- **Integration Tests**: Page-level functionality

### Test Configuration

- **Jest** for NestJS backend with @nestjs/testing utilities
- **Vitest** for frontend (browser environment with jsdom)
- **NestJS Testing**: Built-in testing module for dependency injection in tests
- **Shared test utilities** for common patterns

## 🚀 Build and Development

### Development Workflow

- **Turbo dev**: Parallel development servers
- **Hot reload**: Both frontend and backend
- **Type checking**: Continuous validation
- **Git hooks**: Pre-commit linting and formatting

### Build Strategy

- **Incremental builds**: Only rebuild changed packages
- **Dependency caching**: Turbo remote cache support
- **Parallel execution**: Maximum build efficiency

### Code Quality

- **ESLint**: Consistent code style and best practices
- **Prettier**: Automated code formatting
- **Husky**: Git hooks for quality gates
- **lint-staged**: Only lint changed files

## 🔐 Security Considerations

### Password Handling

- **Current Implementation**: Passwords stored as plain text in hashedPassword field (NOT SECURE)
- **Planned Implementation**: Argon2 password hashing (decided)
- **Validation**: Strong password requirements (planned)

### Authentication Strategy (Decided)

- **JWT tokens**: Stateless authentication with cookies (no Passport.js)
- **HTTP-only cookies**: XSS protection
- **Secure cookies**: Production security
- **Session management**: JWT token refresh strategy

### Authentication Endpoints (Decided)

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /users/me` - View user profile
- `PATCH /users/me` - Update user profile

### Input Validation

- **DTO validation**: Class-validator decorators
- **Type safety**: TypeScript compile-time checks
- **Sanitization**: Input cleaning and normalization

## 📊 Current Implementation Status

### ✅ Completed Foundation

- Monorepo structure with working builds
- Backend API with user CRUD operations
- Frontend pages with basic navigation
- Database schema and migrations
- Testing infrastructure
- Code quality tools and Git hooks

### 🚧 In Progress

- Authentication implementation
- Frontend form handling
- Error boundary components
- API integration

### 📋 Planned Features (Decided)

- **Authentication Flow**: JWT-based login/register/logout
- **Protected Routes**: Frontend route guards
- **User Profile Management**: View and edit user profile
- **Password Security**: Argon2 hashing implementation
- **Session Management**: Secure JWT cookie handling

### 📋 Future Considerations

- Password reset functionality
- Email verification
- Role-based access control

## 🔗 Key Technical References

- **Hexagonal Architecture**:
  [https://apprendre-la-programmation.net/architecture-hexagonale](https://apprendre-la-programmation.net/architecture-hexagonale)
  (project reference)
- **NestJS Documentation**: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- **Astro Documentation**: [https://docs.astro.build/](https://docs.astro.build/)
- **Prisma Documentation**: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
- **Turbo Documentation**: [https://turbo.build/repo/docs](https://turbo.build/repo/docs)
