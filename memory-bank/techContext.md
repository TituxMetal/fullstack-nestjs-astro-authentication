# Tech Context: Technology Stack & Setup

## Technology Stack

### Monorepo Management

- **Turbo:** Build system and task orchestration
- **Workspace:** Shared tooling and configurations
- **Package Management:** Corepack yarn v4.9.1 + yarn workspaces

### Backend Technologies

#### Core Framework

- **NestJS:** v11.1.1 (latest stable) - TypeScript framework for Node.js
- **Node.js:** v22.15.1 LTS (managed with nvm)
- **TypeScript:** Type-safe JavaScript development

#### Database & ORM

- **Prisma:** Modern ORM with type safety
- **Database:** SQLite (development and production)
- **Migration:** Prisma migrations for schema versioning

#### Authentication & Security

- **JWT:** JSON Web Tokens for authentication
- **Argon2:** Password hashing algorithm
- **Cookie Parser:** Secure cookie handling
- **Helmet:** Security headers
- **CORS:** Cross-origin resource sharing

#### Testing

- **Jest:** Testing framework (backend/NestJS)
- **Supertest:** HTTP assertion testing
- **Database testing:** SQLite in-memory for tests

### Frontend Technologies

#### Core Framework

- **Astro:** v5.8.0 (latest stable) - Modern SSR framework with hydration
- **React:** UI component library
- **TypeScript:** Type-safe development

#### Styling & UI

- **Tailwind CSS:** v4.1.5 (latest stable) - Utility-first CSS framework (handles all CSS
  processing)

#### Forms & Validation

- **React Hook Form:** Performant form library
- **Zod:** TypeScript-first schema validation
- **Error Handling:** Consistent validation patterns

#### Testing

- **Vitest:** Testing framework (frontend/Astro)
- **React Testing Library:** Component testing
- **MSW:** API mocking for tests

### Shared Tooling

#### Code Quality

- **ESLint:** Code linting
- **Prettier:** Code formatting
- **commitlint:** Conventional commit enforcement
- **Commitizen:** Guided commit message creation
- **Husky:** Git hooks
- **lint-staged:** Pre-commit linting

#### Versioning & Release

- **Changesets:** Monorepo-aware versioning and changelog generation

#### Build & Deployment

- **TypeScript:** Type checking
- **esbuild/Vite:** Fast bundling
- **Docker:** Containerization (optional)

## Development Setup Requirements

### System Requirements

- **Node.js:** v22.15.1 LTS (managed with nvm)
- **Yarn:** v4.9.1 (managed with corepack)
- **Git:** >= 2.30.0
- **Database:** SQLite (no external database required)

### IDE Configuration

- **VS Code Extensions:**
  - Prisma
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense
  - Astro

### Environment Variables

#### Backend (.env)

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="7d"

# Server
PORT=3000
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:4321"
```

#### Frontend (.env)

```env
# API Configuration
PUBLIC_API_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

## Package Dependencies

### Backend Dependencies

```json
{
  "dependencies": {
    "@nestjs/common": "^11.x",
    "@nestjs/core": "^11.x",
    "@nestjs/platform-express": "^11.x",
    "@nestjs/jwt": "^11.x",
    "@prisma/client": "^5.x",
    "argon2": "^0.x",
    "cookie-parser": "^1.x",
    "class-validator": "^0.x",
    "class-transformer": "^0.x"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.x",
    "prisma": "^5.x",
    "jest": "^29.x",
    "supertest": "^6.x",
    "@types/jest": "^29.x",
    "@types/node": "^20.x",
    "typescript": "^5.x"
  }
}
```

### Frontend Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@astro/react": "^3.x",
    "@astro/tailwind": "^5.x",
    "tailwindcss": "^4.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "typescript": "^5.x"
  }
}
```

## Development Workflow

### Project Structure

```
project-root/
├── apps/
│   ├── backend/          # NestJS application
│   └── frontend/         # Astro application
├── packages/
│   ├── shared-types/     # Shared TypeScript types
│   └── eslint-config/    # Shared ESLint configuration
├── turbo.json           # Turbo configuration
├── package.json         # Root package.json
└── README.md
```

### Build Scripts

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write .",
    "type-check": "turbo run type-check"
  }
}
```

### Development Commands

- **Start Development:** `yarn dev` (both apps)
- **Build All:** `yarn build`
- **Run Tests:** `yarn test`
- **Lint Code:** `yarn lint`
- **Database Migration:** `yarn dlx prisma migrate dev`
- **Generate Types:** `yarn dlx prisma generate`

## Technical Constraints & Considerations

### Performance

- Bundle size optimization with tree shaking
- Lazy loading for non-critical components
- Database query optimization with Prisma
- Caching strategies for API responses

### Security

- Environment variable security
- HTTPS in production
- Secure cookie configurations
- Rate limiting implementation
- Input validation and sanitization

### Scalability

- Stateless authentication with JWT
- Database connection pooling
- Horizontal scaling considerations
- CI/CD pipeline readiness

### Browser Support

- Modern browsers (ES2020+)
- Mobile responsive design
- Progressive enhancement
- Accessibility (WCAG 2.1)

## Deployment Considerations

### Production Environment

- **Database:** SQLite (development and production)
- **Backend:** Node.js hosting (Vercel, Railway, etc.)
- **Frontend:** Static hosting (Vercel, Netlify, etc.)
- **Environment:** Secure secret management

### CI/CD Pipeline

- Automated testing on PR
- Type checking validation
- Build verification
- Automated code coverage reporting via pull request comments
- Automated dependency vulnerability scanning
- Deployment automation
