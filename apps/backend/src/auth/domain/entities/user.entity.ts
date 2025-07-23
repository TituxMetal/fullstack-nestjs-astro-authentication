import type { Email } from '~/auth/domain/value-objects/email.vo'
import type { Password } from '~/auth/domain/value-objects/password.vo'

export type UserRole = 'USER' | 'ADMIN'

export class User {
  readonly id: string
  readonly email: Email
  readonly password: Password
  readonly role: UserRole

  constructor(id: string, email: Email, password: Password, role: UserRole = 'USER') {
    this.id = id
    this.email = email
    this.password = password
    this.role = role
  }

  // Domain methods
  isAdmin(): boolean {
    return this.role === 'ADMIN'
  }

  changeRole(newRole: UserRole): User {
    return new User(this.id, this.email, this.password, newRole)
  }
}
