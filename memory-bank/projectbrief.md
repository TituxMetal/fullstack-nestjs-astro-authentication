# Project Brief: Fullstack Authentication System

## Project Goal

Build a modern, secure fullstack web application with user authentication using a clean architecture
approach in a Turbo monorepo structure.

## Core Technologies

- **Monorepo Management:** Turbo
- **Backend:** NestJS with hexagonal architecture
- **Frontend:** Astro with React integration
- **Styling:** Tailwind CSS V4
- **Database:** Prisma ORM
- **Authentication:** JWT with cookies (no Passport.js)
- **Security:** Argon for password hashing

## Key Requirements

### Backend Architecture

- Implement hexagonal architecture following
  https://apprendre-la-programmation.net/architecture-hexagonale
- Organize code into domain, application, and infrastructure layers
- Create modular structure for scalability

### Authentication API

Required endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /users/me` - View user profile
- `PATCH /users/me` - Update user profile

### Frontend Features

- Hybrid authentication page (login + registration)
- Profile page with inline editing capabilities
- Reusable component architecture
- Form handling with React Hook Form

### Quality Standards

- Unit tests for all business logic
- Best practices implementation
- Clean, maintainable code structure
- Type safety with TypeScript

## Project Scope

This is a foundational authentication system that can serve as the base for larger applications.
Focus is on security, clean architecture, and developer experience.

## Success Criteria

- Secure JWT authentication with cookies
- Clean hexagonal architecture implementation
- Functional frontend with good UX
- Comprehensive test coverage
- Well-documented, maintainable codebase
