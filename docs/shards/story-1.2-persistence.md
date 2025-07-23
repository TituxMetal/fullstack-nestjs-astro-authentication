# Story 1.2: [BE] Implement Database Persistence

**GitHub Issue:** [BE] Story 1.2: Implement Database Persistence
[#14](https://github.com/TituxMetal/fullstack-nestjs-astro-authentication/issues/14)

## Goal

To connect our abstract domain logic to a concrete database implementation using Prisma. This
component is the "adapter" that translates between the domain and the infrastructure layer.

## Requirements

- A `User` model must be added to the `schema.prisma` file.
- A `UserMapper` class must be created. This class is responsible for converting the Prisma `User`
  model to our domain `User` entity, and vice versa. This is a critical step to ensure our domain
  layer remains completely ignorant of Prisma.
- A `DbUserRepository` class must be created in the `infrastructure/repositories` directory.
- This `DbUserRepository` must implement our domain's `IUserRepository` interface.
- It will use the `PrismaService` for database access and the `UserMapper` for data conversion.

## Learning Focus

This story is our first step into the "infrastructure" layer. The key lesson is **dependency
inversion**. Our `DbUserRepository` (a low-level, concrete detail) depends on the `IUserRepository`
(a high-level, abstract interface) from our domain. This fulfills the "D" in SOLID and is a
cornerstone of Clean Architecture. We are "plugging in" our database implementation to the port
defined by our domain.
