# Active Context: Current Work & Decisions

## Current Work Focus

**Phase:** Issue #9 - Framework Initialization (NestJS + Astro)  
**Priority:** High - Implementation plan finalized, ready to execute  
**Current Status:** Planning complete, proceeding with framework setup

## Recent Changes

- ✅ **Memory Bank Initialized:** Created comprehensive documentation structure
- ✅ **Architecture Decided:** Hexagonal architecture for backend, component-based for frontend
- ✅ **Tech Stack Finalized:** NestJS + Astro/React in Turbo monorepo
- ✅ **Security Approach:** JWT cookies with Argon2 hashing (no Passport.js)
- ✅ **Issue #1 COMPLETED:** Environment setup (Node.js v22.15.1 + Yarn 4.9.1) - Merged via PR #7
- ✅ **Issue #2 COMPLETED:** Monorepo structure with Turbo - Merged via PR #8
- ✅ **Issue #9 CREATED:** Framework initialization (NestJS + Astro) with corrected dependencies
- ✅ **Project Roadmap:** Complete issue planning with logical dependency flow
- 🚧 **Issue #3 IMPLEMENTED:** TypeScript & Linting configuration complete, PR open for framework
  validation
- ✅ **Issue #9 PLANNING COMPLETE:** Comprehensive implementation plan finalized with architectural
  decisions

## Next Immediate Steps

### 🎯 Current Priority: Issue #9 - Framework Initialization

**Implementation Plan Status:**

- ✅ **Planning Complete:** Comprehensive step-by-step implementation plan finalized
- ✅ **Architecture Simplified:** Hexagonal structure optimized (removed modules/ folder level)
- ✅ **Dependencies Confirmed:** Latest stable versions identified (NestJS 11.1.1, Astro 5.8.0,
  Tailwind 4.1.5)
- ✅ **Configuration Decisions:** SSR with node adapter, minimal JWT config, full unit testing setup
- 🚀 **Ready to Execute:** All planning questions resolved, implementation can begin

**Next Steps:**

- Phase 1: Backend Framework Setup (NestJS + simplified hexagonal architecture)
- Phase 2: Frontend Framework Setup (Astro SSR + React + Tailwind 4.1.5)
- Phase 3: Database Setup (Prisma in backend workspace)
- Phase 4: Integration & Issue #3 validation
- Phase 5: Minimal framework validation

**User's Modern Preferences:**

- **Config Files:** prettier.config.cjs and eslint.config.cjs (not legacy formats)
- **Prettier Settings:** trailingComma: 'none', tabWidth: 2, arrowParens: 'avoid', bracketSpacing:
  true, jsxSingleQuote: true, singleQuote: true, proseWrap: 'always', semi: false, printWidth: 100
- **ESLint:** User provided working NestJS and Astro configs to adapt for monorepo
- **Path Aliases:** ~ points to local src/ in each workspace, @auth-system/ for cross-workspace

### 📋 Complete Project Roadmap (Corrected Dependencies)

**Foundation Phase (Issues #1-5):**

- ✅ Issue #1: Environment Setup (COMPLETED)
- ✅ Issue #2: Monorepo Structure (COMPLETED)
- 🚧 Issue #3: TypeScript & Linting (IMPLEMENTED - awaiting framework validation)
- Issue #4: Git Hooks & Development Workflow
- Issue #5: Project Documentation & Setup Guide

**Framework Initialization:**

- Issue #9: 🚀 Initialize NestJS & Astro (Must complete BEFORE Issue #6)

**Complete Validation:**

- Issue #6: ✅ Validate Complete Development Environment (Can now test REAL frameworks)

**Next Phase:**

- Backend Domain Layer implementation

## Active Decisions & Considerations

### ✅ Confirmed Decisions

- **No Passport.js:** Direct JWT implementation for learning/control
- **Cookie-based Auth:** More secure than localStorage approach
- **Hexagonal Architecture:** Proper separation of concerns
- **Unit Tests Only:** No e2e tests per requirements
- **Argon2 Hashing:** Industry standard for password security

### ✅ Recently Confirmed Decisions

- **Package Manager:** Corepack yarn v4.9.1 + yarn workspaces (no npm/pnpm)
- **Database:** SQLite for both development and production
- **Testing:** Jest (backend/NestJS) + Vitest (frontend/Astro)
- **Development Methodology:** Test-Driven Development (TDD)
- **Styling:** Tailwind CSS V4.1.5 (latest stable) only (no PostCSS/Autoprefixer)
- **Node Version:** v22.15.1 LTS (managed with nvm)
- **API Versioning:** Keep simple for now (no versioning initially)
- **Logging:** NestJS built-in logging solution
- **Deployment:** Docker containers on personal Debian server

### ✅ Code Style & Standards Decisions

- **Modern Config Files:** prettier.config.cjs and eslint.config.cjs (not legacy formats)
- **Path Aliases:** Use ~ (tilde) for local modules, @auth-system/ for cross-workspace
- **Import Ordering:** ESLint import/order with alphabetization
- **Code Style:** User's exact Prettier preferences (no semicolons, single quotes, etc.)
- **Scope Adherence:** Complete one issue at a time, avoid scope creep

### ✅ Final Implementation Decisions

- **Validation Strategy:** Application layer validation (DTOs with class-validator)
- **TDD Approach:** Inside-out TDD (domain → application → infrastructure)
- **Development Environment:** Native Node.js development, Docker for production only
- **Project Setup:** Complete from-scratch build for learning
- **Authentication Scope:** Basic JWT cookies initially, refresh tokens later with password reset
- **Test Database:** In-memory SQLite for unit tests

### ✅ Critical Project Insights

- **Issue Dependencies:** User identified logical flaw - Issue #6 can't validate configs without
  frameworks
- **Corrected Flow:** Foundation → Framework Initialization → Complete Validation
- **Modern Tooling:** User prefers latest config formats, not outdated legacy approaches
- **Practical Validation:** Issue #6 now validates REAL working environment, not theoretical configs
- **Pragmatic Approach:** Issue #3 implementation complete but PR remains open until framework
  validation
- **Real-World Testing:** ESLint rules need actual NestJS/Astro code to verify compatibility
- **Architecture Simplification:** Removed modules/ folder level for easier navigation while
  maintaining hexagonal integrity
- **Latest Stable Versions:** Confirmed current stable versions (NestJS 11.1.1, Astro 5.8.0,
  Tailwind 4.1.5)
- **SSR Configuration:** Astro with SSR + node adapter for authentication requirements
- **Minimal JWT Setup:** Just enough JWT config to validate dependency integration, not full
  implementation

### 🤔 Remaining Questions

- **Error Handling:** Global error handling strategy (to define during development)

### 💡 Improvement Suggestions

Based on the requirements, here are recommended enhancements:

1. **API Versioning:** Implement `/api/v1/` for future compatibility
2. **Role-Based Access:** Add user roles for scalability
3. **Email Verification:** Add email confirmation for registration
4. **Password Reset:** Implement password reset functionality
5. **Rate Limiting:** Add auth endpoint protection
6. **Refresh Tokens:** Implement token refresh mechanism
7. **Audit Logging:** Track authentication events
8. **API Documentation:** Add Swagger/OpenAPI docs

## Important Patterns & Preferences

### Code Organization

- **Domain-First:** Start with domain models, then build outward
- **Interface Segregation:** Small, focused interfaces
- **Dependency Injection:** Consistent DI patterns throughout
- **Type Safety:** Strict TypeScript configurations
- **Modern Configs:** Use latest config file formats, not legacy

### Testing Strategy

- **Test Pyramid:** More unit tests, fewer integration tests
- **Domain Testing:** Focus on business logic testing
- **Mock External Dependencies:** Use mocks for infrastructure
- **Fast Feedback:** Tests should run quickly

### User Experience Priorities

- **Progressive Enhancement:** Works without JavaScript
- **Mobile First:** Responsive design from start
- **Accessibility:** WCAG 2.1 compliance
- **Performance:** Fast initial load times

## Project Insights & Learnings

### Architecture Benefits

- **Hexagonal Pattern:** Excellent for testability and maintainability
- **Monorepo Structure:** Simplifies shared type management
- **Cookie Authentication:** More secure than token in localStorage

### Technology Choices

- **Astro + React:** Great balance of static generation and interactivity
- **Tailwind V4:** Utility-first approach speeds development
- **Prisma:** Type-safe database operations reduce bugs
- **Turbo:** Efficient build caching and task running

### Security Considerations

- **httpOnly Cookies:** Prevents XSS attacks
- **SameSite Cookies:** CSRF protection
- **Argon2:** Resistant to timing attacks
- **Input Validation:** Multiple layers of validation

### Critical Learning: Issue Dependencies Logic

- **User's Insight:** Can't validate TypeScript/ESLint configs without actual frameworks
- **Corrected Flow:** Initialize frameworks BEFORE validation for complete testing
- **Practical Approach:** Issue #6 now validates real working environment

## Current Blockers & Risks

### Potential Blockers

- **None identified** - Clear roadmap with corrected dependencies

### Risk Mitigation

- **Complexity Risk:** Start simple, add features incrementally
- **Security Risk:** Follow OWASP guidelines strictly
- **Performance Risk:** Monitor bundle sizes from start
- **Maintenance Risk:** Document architectural decisions
- **Config Risk:** Use modern formats to avoid legacy deprecation

## Communication Notes

- User requested step-by-step planning approach
- Focus on best practices and clean architecture
- Generate comprehensive unit tests
- User prefers modern tooling and config formats
- User identified and corrected logical flaw in issue dependencies
- Open to suggestions for improvements
