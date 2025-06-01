import type { CreateUserDto } from '@auth-system/types'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { PrismaService } from '~/shared/infrastructure/database/prisma.service'
import { User } from '~/users/domain/entities/user.entity'
import { UserAlreadyExistsError } from '~/users/domain/errors/user.errors'

import { DbUserRepository } from './DbUser.repository'

describe('DbUserRepository', () => {
  let repository: DbUserRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbUserRepository,
        {
          provide: PrismaService,
          useValue: { user: { findMany: jest.fn(), create: jest.fn() } }
        }
      ]
    }).compile()

    repository = module.get<DbUserRepository>(DbUserRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('getUsers', () => {
    it('should return users from database', async () => {
      const mockDbUser = {
        id: '1',
        email: 'test@example.com',
        hashedPassword: 'Secure123',
        createdAt: new Date('2025-05-31T13:27:44.123Z'),
        updatedAt: new Date('2025-05-31T13:27:44.123Z')
      }

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockDbUser])

      const result = await repository.getUsers()

      expect(result).toEqual([User.fromPersistence(mockDbUser)])
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      })
    })
  })

  describe('createUser', () => {
    it('should create user in database', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        password: 'Secure123'
      }

      const mockDbUser = {
        id: '2',
        email: createUserDto.email,
        hashedPassword: createUserDto.password,
        createdAt: new Date('2025-05-31T13:27:44.123Z'),
        updatedAt: new Date('2025-05-31T13:27:44.123Z')
      }

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockDbUser)

      const result = await repository.createUser(createUserDto)

      expect(result).toEqual(User.fromPersistence(mockDbUser))
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          hashedPassword: createUserDto.password
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      })
    })

    it('should throw UserAlreadyExistsError on duplicate email', async () => {
      const dto = { email: 'test@test.com', password: 'password123' }
      jest.spyOn(prismaService.user, 'create').mockRejectedValue(
        new PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '6.8.2'
        })
      )

      await expect(repository.createUser(dto)).rejects.toThrow(UserAlreadyExistsError)
    })
  })
})
