# API Specification: Authentication Endpoints

_This document defines the complete REST API contracts for the authentication system._

_Document created on: 2025-07-23_ _Facilitator: API Architect_

## 1. API Overview

**Base URL**: `http://localhost:3000` (development) | `https://your-domain.com` (production)

**Content Type**: `application/json`

**Authentication**: JWT tokens via HTTP-only cookies

**Error Format**: Consistent error response structure across all endpoints

## 2. Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request:**

```typescript
{
  email: string // Valid email format, max 254 characters
  password: string // Min 8 chars, must contain uppercase, lowercase, number, special char
}
```

**Response (201 Created):**

```typescript
{
  user: {
    id: string      // UUID format
    email: string   // Normalized email
    role: 'USER'    // Default role for new users
  },
  message: string   // Success message
}
```

**Headers:**

```typescript
Set-Cookie: token=<jwt-token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Error Responses:**

```typescript
// 400 Bad Request - Validation error
{
  error: "Validation Error",
  message: "Password must contain uppercase, lowercase, number and special character",
  statusCode: 400
}

// 409 Conflict - Email already exists
{
  error: "Conflict",
  message: "Email already exists",
  statusCode: 409
}
```

### POST /auth/login

Authenticate existing user.

**Request:**

```typescript
{
  email: string // User's email address
  password: string // User's password
}
```

**Response (200 OK):**

```typescript
{
  user: {
    id: string      // User UUID
    email: string   // User email
    role: string    // USER or ADMIN
  },
  message: string   // Success message
}
```

**Headers:**

```typescript
Set-Cookie: token=<jwt-token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Error Responses:**

```typescript
// 401 Unauthorized - Invalid credentials
{
  error: "Unauthorized",
  message: "Invalid credentials",
  statusCode: 401
}

// 429 Too Many Requests - Rate limit exceeded
{
  error: "Too Many Requests",
  message: "Too many login attempts. Please try again later.",
  statusCode: 429
}
```

### POST /auth/logout

Clear user session.

**Request:** Empty body

**Response (200 OK):**

```typescript
{
  message: 'Logout successful'
}
```

**Headers:**

```typescript
Set-Cookie: token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
```

### GET /auth/me

Get current authenticated user profile.

**Authentication Required**: Yes (JWT cookie)

**Request:** No body

**Response (200 OK):**

```typescript
{
  user: {
    id: string // User UUID
    email: string // User email
    role: string // USER or ADMIN
  }
}
```

**Error Responses:**

```typescript
// 401 Unauthorized - No valid token
{
  error: "Unauthorized",
  message: "Authentication required",
  statusCode: 401
}
```

## 3. OpenAPI 3.0 Specification

```yaml
openapi: 3.0.0
info:
  title: Authentication Starter API
  version: 1.0.0
  description: Clean Architecture Authentication System
  contact:
    name: API Support
    email: support@auth-starter.com

servers:
  - url: http://localhost:3000
    description: Development server
  - url: https://api.auth-starter.com
    description: Production server

paths:
  /auth/register:
    post:
      summary: Register new user
      description: Create a new user account with email and password
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
            examples:
              valid:
                summary: Valid registration
                value:
                  email: 'user@example.com'
                  password: 'SecurePass123!'
      responses:
        '201':
          description: User registered successfully
          headers:
            Set-Cookie:
              description: HTTP-only JWT token
              schema:
                type: string
                example:
                  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict;
                  Max-Age=86400'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                weak_password:
                  summary: Weak password
                  value:
                    error: 'Validation Error'
                    message:
                      'Password must contain uppercase, lowercase, number and special character'
                    statusCode: 400
        '409':
          description: Email already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '429':
          description: Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /auth/login:
    post:
      summary: Authenticate user
      description: Login with email and password
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
          headers:
            Set-Cookie:
              description: HTTP-only JWT token
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '429':
          description: Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /auth/logout:
    post:
      summary: Clear authentication
      description: Logout current user and clear session
      tags:
        - Authentication
      responses:
        '200':
          description: Logout successful
          headers:
            Set-Cookie:
              description: Cleared JWT cookie
              schema:
                type: string
                example: 'token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: 'Logout successful'

  /auth/me:
    get:
      summary: Get current user profile
      description: Retrieve authenticated user information
      tags:
        - Authentication
      security:
        - CookieAuth: []
      responses:
        '200':
          description: User profile
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Not authenticated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:
  schemas:
    RegisterRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          maxLength: 254
          description: Valid email address
          example: 'user@example.com'
        password:
          type: string
          minLength: 8
          maxLength: 128
          pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$'
          description: Password with uppercase, lowercase, number, and special character
          example: 'SecurePass123!'

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          description: User's email address
          example: 'user@example.com'
        password:
          type: string
          description: User's password
          example: 'SecurePass123!'

    AuthResponse:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/User'
        message:
          type: string
          description: Success message
          example: 'Registration successful'

    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique user identifier
          example: '123e4567-e89b-12d3-a456-426614174000'
        email:
          type: string
          format: email
          description: User's email address
          example: 'user@example.com'
        role:
          type: string
          enum: [USER, ADMIN]
          description: User's role in the system
          example: 'USER'

    ErrorResponse:
      type: object
      required:
        - error
        - message
        - statusCode
      properties:
        error:
          type: string
          description: Error category
          example: 'Validation Error'
        message:
          type: string
          description: Human-readable error message
          example: 'Invalid email format'
        statusCode:
          type: integer
          description: HTTP status code
          example: 400
        timestamp:
          type: string
          format: date-time
          description: Error timestamp (optional)
        path:
          type: string
          description: Request path (optional)

  securitySchemes:
    CookieAuth:
      type: apiKey
      in: cookie
      name: token
      description: JWT token stored in HTTP-only cookie

tags:
  - name: Authentication
    description: User authentication and session management
```

## 4. Rate Limiting

| Endpoint              | Limit       | Window     | Scope    |
| --------------------- | ----------- | ---------- | -------- |
| `POST /auth/register` | 2 requests  | 60 seconds | Per IP   |
| `POST /auth/login`    | 3 requests  | 60 seconds | Per IP   |
| `POST /auth/logout`   | 5 requests  | 60 seconds | Per IP   |
| `GET /auth/me`        | 10 requests | 60 seconds | Per user |

**Rate Limit Headers:**

```curl
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 1642694400
```

## 5. Security Considerations

### Authentication Flow

1. User provides credentials
2. Server validates and creates JWT
3. JWT stored in HTTP-only cookie
4. Subsequent requests include cookie automatically
5. Server validates JWT and extracts user info

### Cookie Configuration

```typescript
{
  httpOnly: true,        // Prevent XSS access
  secure: true,          // HTTPS only in production
  sameSite: 'strict',    // CSRF protection
  maxAge: 86400000       // 24 hours
}
```

### Error Handling

- Generic error messages to prevent information leakage
- No distinction between "user not found" and "wrong password"
- Consistent response format across all endpoints
- Rate limiting to prevent brute force attacks

## 6. Testing Examples

### cURL Examples

**Register:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

**Get Profile:**

```bash
curl -X GET http://localhost:3000/auth/me \
  -b cookies.txt
```

**Logout:**

```bash
curl -X POST http://localhost:3000/auth/logout \
  -b cookies.txt
```

### JavaScript/TypeScript Examples

```typescript
// Register new user
const registerResponse = await fetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!'
  })
})

// Login
const loginResponse = await fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!'
  })
})

// Get current user (authenticated request)
const profileResponse = await fetch('/auth/me', {
  credentials: 'include'
})

// Logout
const logoutResponse = await fetch('/auth/logout', {
  method: 'POST',
  credentials: 'include'
})
```

---

## Next Steps

This API specification provides complete contracts for frontend integration. For implementation
details, see:

- `backend-architecture.md` - System architecture overview
- `backend-security.md` - Security implementation patterns
- `@auth-system/types` package - TypeScript type definitions
