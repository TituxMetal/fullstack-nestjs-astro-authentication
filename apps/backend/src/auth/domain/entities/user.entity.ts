import type { Email } from '~/auth/domain/value-objects/email.vo'
import type { Password } from '~/auth/domain/value-objects/password.vo'

export class User {
  id: string
  email: Email
  password: Password

  constructor(id: string, email: Email, password: Password) {
    this.id = id
    this.email = email
    this.password = password
  }
}
