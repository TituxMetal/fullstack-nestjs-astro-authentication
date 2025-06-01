import type { CreateUserDto } from '@auth-system/types'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'

import { User } from '~/users/domain/entities/user.entity'
import type { IUserRepository } from '~/users/domain/repositories'

import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let mockUserRepository: jest.Mocked<IUserRepository>

  beforeEach(async () => {
    mockUserRepository = {
      getUsers: jest.fn(),
      createUser: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getUsers', () => {
    it('should return users from repository', async () => {
      const expectedUsers: User[] = [User.create('1', 'test@example.com', 'Secure123')]
      mockUserRepository.getUsers.mockResolvedValue(expectedUsers)

      const result = await service.getUsers()

      expect(result).toEqual(expectedUsers)
      expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1)
    })
  })

  describe('createUser', () => {
    it('should create user through repository', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        password: 'hashedPassword123'
      }
      const expectedUser = User.create('2', createUserDto.email, createUserDto.password)
      mockUserRepository.createUser.mockResolvedValue(expectedUser)

      const result = await service.createUser(createUserDto)

      expect(result).toEqual(expectedUser)
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(createUserDto)
      expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1)
    })
  })
})
