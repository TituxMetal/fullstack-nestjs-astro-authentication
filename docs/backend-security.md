# Backend Security: Production-Ready Authentication

_This document defines the comprehensive security architecture and implementation patterns for the
authentication system._

_Document created on: 2025-07-23_ _Facilitator: Security Architect_

## 1. Security Philosophy & Principles

The authentication system prioritizes **security by design** with defense-in-depth strategies:

- **Zero Trust Architecture**: Validate every request, trust nothing by default
- **Principle of Least Privilege**: Minimal permissions for all components
- **Defense in Depth**: Multiple security layers (authentication, authorization, input validation)
- **Security First**: Security considerations drive implementation decisions

## 2. Authentication Security

### Password Protection

**Argon2 Implementation** (Industry Standard):

```typescript
// Secure Argon2 configuration
const argon2Config = {
  type: argon2.argon2id, // Recommended variant
  memoryCost: 2 ** 16, // 64 MB memory cost
  timeCost: 3, // 3 iterations
  parallelism: 1 // Single thread
}

export class Password {
  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 8) {
      throw new DomainError('Password must be at least 8 characters')
    }
    const hashed = await argon2.hash(plainPassword, argon2Config)
    return new Password(hashed)
  }

  async verify(plainPassword: string): Promise<boolean> {
    return argon2.verify(this.hashedValue, plainPassword)
  }
}
```

**Why Argon2 over bcrypt:**

- Winner of Password Hashing Competition (2015)
- Resistant to GPU and ASIC attacks
- Configurable memory usage makes attacks expensive
- Industry standard for new applications

### JWT Token Security

**Secure JWT Configuration:**

```typescript
const jwtConfig = {
  secret: process.env.JWT_SECRET, // 256-bit random secret
  expiresIn: '24h', // Short-lived tokens
  issuer: 'auth-starter', // Token issuer validation
  audience: 'auth-starter-users' // Token audience validation
}

// HTTP-only cookie configuration
const cookieConfig = {
  httpOnly: true, // Prevent XSS access
  secure: true, // HTTPS only in production
  sameSite: 'strict', // CSRF protection
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}
```

**Security Benefits:**

- **HTTP-only cookies**: Cannot be accessed via JavaScript (XSS protection)
- **Secure flag**: Only transmitted over HTTPS in production
- **SameSite strict**: Prevents CSRF attacks
- **Short expiration**: Limits exposure window

### Rate Limiting & Brute Force Protection

```typescript
@Controller('auth')
@UseGuards(ThrottlerGuard)
@Throttle(5, 60) // 5 requests per minute (global auth limit)
export class AuthController {
  @Post('login')
  @Throttle(3, 60) // Stricter limit for login attempts
  async login(@Body() loginDto: LoginDto) {
    // Implementation
  }

  @Post('register')
  @Throttle(2, 60) // Even stricter for registration
  async register(@Body() registerDto: RegisterDto) {
    // Implementation
  }
}
```

## 3. Authorization & Access Control

### Role-Based Access Control (RBAC)

**Role Implementation:**

```typescript
export type UserRole = 'USER' | 'ADMIN'

// Role decorator for method-level authorization
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler())
    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.role === role)
  }
}

// Usage in controllers
@Get('admin-dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
async adminOnlyEndpoint(@CurrentUser() user: User) {
  // Admin-only functionality
}
```

## 4. Input Validation & Data Protection

### Request Validation

**DTO Security with class-validator:**

```typescript
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number and special character'
  })
  password: string
}
```

**Domain-Level Validation:**

```typescript
export class Email {
  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new DomainError('Invalid email format')
    }
    this.value = email.toLowerCase().trim()
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }
}
```

### SQL Injection Prevention

```typescript
// ✅ Secure - Prisma automatically parameterizes queries
async findByEmail(email: Email): Promise<User | null> {
  const user = await this.prisma.user.findUnique({
    where: { email: email.toString() }
  })
  return user ? UserMapper.toDomain(user) : null
}

// ❌ NEVER use raw SQL with string interpolation
// await this.prisma.$executeRaw`SELECT * FROM users WHERE email = ${email}`
```

## 5. Infrastructure Security

### Container Security

**Dockerfile Security Practices:**

```dockerfile
# Non-root user execution
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Minimal base image
FROM node:22-alpine

# Remove package managers in production
RUN rm -rf /usr/local/lib/node_modules/npm

# Explicit file permissions
RUN chown -R appuser:appgroup /app
```

### Environment Security

**Configuration Validation:**

```typescript
import * as Joi from 'joi'

const configSchema = Joi.object({
  JWT_SECRET: Joi.string().min(32).required(),
  DATABASE_URL: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  CORS_ORIGIN: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
})

// Validate on startup
const { error } = configSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
```

### Security Headers

```typescript
// Global security headers configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
)
```

## 6. Error Handling & Security

### Layered Error Architecture

```typescript
// Domain Layer - Business rule violations
export class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
  }
}

// Application Layer - Use case failures
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApplicationError'
  }
}

// Infrastructure Layer - Technical failures
export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = 'InfrastructureError'
  }
}
```

### Security-Aware Exception Filter

```typescript
@Catch()
export class SecurityExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SecurityExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    // Log security events
    if (exception instanceof UnauthorizedException) {
      this.logger.warn(`Unauthorized access attempt: ${request.ip} -> ${request.url}`)
    }

    // Never expose internal errors in production
    if (exception instanceof InfrastructureError) {
      this.logger.error('Infrastructure error:', exception)
      return response.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        statusCode: 500
      })
    }

    // Generic error response
    return response.status(400).json({
      error: 'Bad Request',
      message: exception instanceof Error ? exception.message : 'Invalid request',
      statusCode: 400
    })
  }
}
```

## 7. Threat Mitigation Matrix

| Threat Category               | Attack Vector        | Mitigation Strategy   | Implementation            |
| ----------------------------- | -------------------- | --------------------- | ------------------------- |
| **Injection**                 | SQL Injection        | Parameterized queries | Prisma ORM                |
| **Broken Authentication**     | Weak passwords       | Strong hashing        | Argon2 + complexity rules |
| **Sensitive Data Exposure**   | Token theft          | Secure cookies        | HTTP-only + Secure flags  |
| **XML External Entities**     | XML parsing          | No XML parsing        | JSON-only API             |
| **Broken Access Control**     | Privilege escalation | RBAC + Guards         | Role-based decorators     |
| **Security Misconfiguration** | Default configs      | Security headers      | Helmet middleware         |
| **Cross-Site Scripting**      | Script injection     | CSP headers           | Content Security Policy   |
| **Insecure Deserialization**  | Object injection     | Type validation       | class-validator           |
| **Known Vulnerabilities**     | Outdated packages    | Dependency scanning   | npm audit + Dependabot    |
| **Logging & Monitoring**      | Security blindness   | Audit logging         | Structured logging        |

## 8. Security Testing Requirements

### Automated Security Testing

```typescript
// Security-focused test cases
describe('Authentication Security', () => {
  it('should reject weak passwords', async () => {
    const weakPasswords = ['123456', 'password', 'qwerty', '12345678']

    for (const password of weakPasswords) {
      await expect(authService.register(new Email('test@test.com'), password)).rejects.toThrow(
        'Password must contain'
      )
    }
  })

  it('should rate limit login attempts', async () => {
    const requests = Array.from({ length: 5 }, () =>
      request(app).post('/auth/login').send({ email: 'test@test.com', password: 'wrong' })
    )

    const responses = await Promise.all(requests)
    const lastResponse = responses[responses.length - 1]
    expect(lastResponse.status).toBe(429) // Too Many Requests
  })

  it('should not expose user existence in error messages', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'nonexistent@test.com', password: 'password' })

    expect(response.body.message).toBe('Invalid credentials') // Generic message
  })
})
```

### Security Checklist

**Pre-Production Security Validation:**

- [ ] All passwords hashed with Argon2
- [ ] JWT tokens in HTTP-only cookies
- [ ] Rate limiting on all auth endpoints
- [ ] Input validation on all DTOs
- [ ] HTTPS enforced in production
- [ ] Security headers configured
- [ ] No sensitive data in logs
- [ ] Environment variables validated
- [ ] Database queries parameterized
- [ ] Error messages don't leak information
- [ ] Dependency vulnerabilities resolved
- [ ] Security tests passing

### Security Monitoring

**Production Security Monitoring:**

```typescript
// Security event logging
@Injectable()
export class SecurityLogger {
  private readonly logger = new Logger(SecurityLogger.name)

  logAuthSuccess(userId: string, ip: string) {
    this.logger.log(`AUTH_SUCCESS: User ${userId} from ${ip}`)
  }

  logAuthFailure(email: string, ip: string, reason: string) {
    this.logger.warn(`AUTH_FAILURE: ${email} from ${ip} - ${reason}`)
  }

  logSuspiciousActivity(ip: string, activity: string) {
    this.logger.error(`SUSPICIOUS: ${activity} from ${ip}`)
  }
}
```

---

## Next Steps

This security architecture provides comprehensive protection for the authentication system. For
implementation examples and testing strategies, see:

- `backend-architecture.md` - High-level architecture overview
- `backend-testing.md` - Security testing strategies and examples
- `api-specification.md` - Secure API endpoint definitions
