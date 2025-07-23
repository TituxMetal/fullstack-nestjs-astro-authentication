# Story 1.1: [BE] Implement User Domain & Core Logic

**GitHub Issue:** [BE] Story 1.1: Implement User Domain & Core Logic
[#13](https://github.com/TituxMetal/fullstack-nestjs-astro-authentication/issues/13)

## Goal

To establish the core, framework-agnostic domain model for a `User` and the business logic for
authentication.

## Requirements

- A `User` domain entity must be created.
- Value Objects for `Email` and `Password` must be created to enforce validation rules at the domain
  level.
- An `IUserRepository` interface (a "port" in Clean Architecture) must be defined in the domain
  layer. It should specify methods like `create`, `findByEmail`, and `findById`.
- A core `AuthService` must be created in the application layer. It will contain the primary
  business logic for registering and logging in a user, including password hashing with Argon2. This
  service will depend on the `IUserRepository` interface, not on any specific database
  implementation.

## Learning Focus

This story is foundational to our Clean Architecture journey. The key is to ensure that **no NestJS
or Prisma-specific code** exists in the files we create here. Everything should be pure TypeScript
classes, interfaces, and types. This enforces the separation between our business rules and our
framework.
