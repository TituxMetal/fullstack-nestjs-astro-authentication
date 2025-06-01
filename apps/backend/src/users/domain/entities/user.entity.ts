import type { UserResponse } from '@auth-system/types'

import { WeakPasswordError } from '~/users/domain/errors/user.errors'

export class User {
  private readonly id: string
  private readonly email: string
  private readonly password: string | undefined
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(
    id: string,
    email: string,
    password: string | undefined,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create(id: string, email: string, password: string): User {
    if (password.length < 8) {
      throw new WeakPasswordError()
    }

    return new User(id, email, password, new Date(), new Date())
  }

  static fromPersistence(data: {
    id: string
    email: string
    hashedPassword?: string
    createdAt: Date
    updatedAt: Date
  }): User {
    return new User(data.id, data.email, data.hashedPassword, data.createdAt, data.updatedAt)
  }

  toResponse(): UserResponse {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }

  getId() {
    return this.id
  }

  getEmail() {
    return this.email
  }

  getPassword() {
    return this.password
  }

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }
}
