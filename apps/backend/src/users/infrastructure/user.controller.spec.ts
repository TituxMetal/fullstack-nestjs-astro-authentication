import type { CreateUserDto } from '@auth-system/types'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { UserService } from '~/users/application'
import { User } from '~/users/domain/entities/user.entity'
import { InvalidEmailError, UserAlreadyExistsError } from '~/users/domain/errors/user.errors'

import { UserController } from './user.controller'

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: 'IUserRepository', useValue: {} }]
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [User.create('1', 'test@test.com', 'Secure123')]

      jest.spyOn(service, 'getUsers').mockResolvedValue(mockUsers)

      const result = await controller.getUsers()

      expect(service.getUsers).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserDto: CreateUserDto = {
        email: 'test@test.com',
        password: 'Secure123'
      }

      const expectedUser = User.create('1', newUserDto.email, newUserDto.password)

      jest.spyOn(service, 'createUser').mockResolvedValue(expectedUser)

      const result = await controller.createUser(newUserDto)

      expect(service.createUser).toHaveBeenCalledWith(newUserDto)
      expect(result).toEqual(expectedUser)
    })

    it('should throw BadRequestException for invalid email', async () => {
      const dto: CreateUserDto = { email: 'invalid', password: 'password123' }
      jest.spyOn(service, 'createUser').mockRejectedValue(new InvalidEmailError('invalid'))

      await expect(controller.createUser(dto)).rejects.toThrow(BadRequestException)
    })

    it('should throw ConflictException for duplicate email', async () => {
      const dto: CreateUserDto = { email: 'test@test.com', password: 'password123' }
      jest
        .spyOn(service, 'createUser')
        .mockRejectedValue(new UserAlreadyExistsError('test@test.com'))

      await expect(controller.createUser(dto)).rejects.toThrow(
        new ConflictException(`User with email ${dto.email} already exists`)
      )
      expect(service.createUser).toHaveBeenCalledWith(dto)
    })
  })
})
