import { DomainError } from '~/shared/domain/errors/domain.error'

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`)
  }
}

export class WeakPasswordError extends DomainError {
  constructor() {
    super('Password must be at least 8 characters long')
  }
}

export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`User with email ${email} already exists`)
  }
}
