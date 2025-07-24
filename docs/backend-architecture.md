# Backend Architecture: Production-Ready Auth Starter Kit

_This document defines the technical architecture for the backend of the v1.0 MVP._

_Document created on: 2025-07-23_ _Facilitator: Architect Agent_

## 1. High-Level Architecture & Philosophy

The backend is built using **NestJS** implementing **Clean Architecture principles** with a focus on
domain-driven design. This approach provides excellent separation of concerns while maintaining the
framework benefits needed for a production authentication system.

- **NestJS Framework**: Enterprise-grade Node.js with built-in dependency injection and decorators
- **Clean Architecture**: Strict layer separation (Domain → Application → Infrastructure)
- **Domain-Driven Design**: Rich entities and value objects with business logic
- **Explicit Technology Constraints**: NO Passport.js, custom JWT implementation with Argon2

## 2. Folder Structure

This structure enforces Clean Architecture boundaries with clear separation of concerns.

```tree
apps/backend/src/
├── auth/                    # Authentication bounded context
│   ├── domain/             # Pure business logic (entities, value objects)
│   │   ├── entities/       # User entity with business methods
│   │   ├── value-objects/  # Email, Password with validation
│   │   └── repositories/   # IUserRepository interface (port)
│   ├── application/        # Use cases and orchestration
│   │   └── services/       # AuthService with register/login logic
│   └── infrastructure/     # External concerns (adapters)
│       ├── controllers/    # HTTP request/response handling
│       ├── repositories/   # Database implementation (DbUserRepository)
│       ├── services/       # JWT token service
│       ├── guards/         # Route protection middleware
│       └── dto/            # Request/response data contracts
├── shared/                 # Cross-cutting concerns
│   ├── domain/            # Common domain interfaces and errors
│   └── infrastructure/    # Database module, global filters
└── users/                 # Legacy CRUD module (to be removed)
```

## 3. Data Flow Strategy

Authentication follows a clean, unidirectional flow through architecture layers:

1. **HTTP Request**: Client sends login/register request to AuthController
2. **Controller Layer**: Validates input DTOs and delegates to AuthService
3. **Application Layer**: AuthService orchestrates domain logic and repository calls
4. **Domain Layer**: User entity and value objects enforce business rules
5. **Infrastructure Layer**: DbUserRepository persists data via Prisma
6. **Response Flow**: Success generates JWT token in HTTP-only cookie

## 4. Technology Stack & Constraints

### Core Technologies

- **Runtime**: Node.js 22 LTS with TypeScript strict mode
- **Framework**: NestJS with dependency injection and decorators
- **Database**: SQLite with Prisma ORM for type-safe queries
- **Authentication**: Custom JWT implementation with @nestjs/jwt
- **Security**: Argon2 password hashing, HTTP-only cookies

### Explicitly Rejected Technologies

- **❌ Passport.js**: Outdated and over-engineered for simple JWT needs
- **❌ bcrypt**: Less secure than Argon2 for password hashing
- **❌ Express sessions**: JWT cookies provide better scalability

## 5. Security Architecture

### Authentication Security

- **Password Hashing**: Argon2 with 64MB memory cost and 3 iterations
- **JWT Tokens**: 24-hour expiration with HTTP-only, secure, SameSite cookies
- **Input Validation**: class-validator decorators on all DTOs
- **Rate Limiting**: 5 requests/minute on auth endpoints, 3/minute on login

### Data Protection

- **Domain Validation**: Email and Password value objects enforce rules
- **Database Security**: Prisma parameterized queries prevent SQL injection
- **Error Handling**: Layered approach (Domain, Application, Infrastructure errors)

## 6. API Design & Integration

### REST Endpoints

- `POST /auth/register` - User registration with email/password
- `POST /auth/login` - User authentication with JWT cookie response
- `POST /auth/logout` - Session termination with cookie clearing
- `GET /auth/me` - Current user profile (protected route)

### Shared Types Integration

The backend leverages `@auth-system/types` for consistent API contracts:

- `CreateUserDto`, `LoginDto` for request validation
- `AuthUser`, `UserResponse` for response formatting
- Type safety across frontend/backend boundary

## 7. Testing Strategy

### Layer-Specific Testing

- **Domain Layer**: 100% unit test coverage for entities and value objects
- **Application Layer**: 90%+ unit tests with mocked repository dependencies
- **Infrastructure Layer**: 80%+ integration tests with real database

### Test Environment

- **Unit Tests**: Jest with mocked dependencies for fast feedback
- **Integration Tests**: In-memory SQLite for database interactions
- **Test Data**: Fixtures and builders for consistent test scenarios

## 8. Performance Considerations

### MVP Performance Philosophy

For MVP: **Simplicity over optimization**

- ✅ Basic Prisma configuration (sufficient for <1000 users)
- ✅ Standard NestJS performance (optimized out-of-box)
- ✅ Simple SQLite setup (fast for development and small scale)
- ❌ Skip advanced caching, monitoring, and optimization until needed

### Future Scaling

Post-MVP optimization based on real usage:

- Database indexing for slow queries
- Caching for frequently accessed users
- Connection pooling for high concurrency
- Performance monitoring and alerting

---

## Next Steps

This architecture provides the foundation for secure, maintainable authentication. For detailed
implementation guidance, see:

- `backend-security.md` - Comprehensive security patterns and implementation
- `backend-testing.md` - Testing strategies and examples
- `backend-deployment.md` - Production deployment with Docker and Portainer
- `api-specification.md` - Complete OpenAPI REST specification
