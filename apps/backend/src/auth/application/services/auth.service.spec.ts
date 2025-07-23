import { User } from '~/auth/domain/entities/user.entity'
import type { IUserRepository } from '~/auth/domain/repositories/user.repository'
import { Email } from '~/auth/domain/value-objects/email.vo'
import { Password } from '~/auth/domain/value-objects/password.vo'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  let authService: AuthService
  let mockUserRepository: jest.Mocked<IUserRepository>

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn()
    }

    authService = new AuthService(mockUserRepository)
  })

  it('should register a new user', async () => {
    const email = new Email('test@example.com')
    const password = new Password('password123')
    const expectedUser = new User('1', email, password)

    mockUserRepository.create.mockResolvedValue(expectedUser)

    const result = await authService.register(email, password)

    expect(result).toEqual(expectedUser)
    expect(mockUserRepository.create).toHaveBeenCalledTimes(1)
  })
})
