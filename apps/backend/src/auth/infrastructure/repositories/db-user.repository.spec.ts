import { execSync } from 'child_process'

import { ConfigModule } from '@nestjs/config'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'

import { User } from '~/auth/domain/entities/user.entity'
import { Email } from '~/auth/domain/value-objects/email.vo'
import { Password } from '~/auth/domain/value-objects/password.vo'
import { PrismaService } from '~/shared/infrastructure/database/prisma.service'

import { DbUserRepository } from './db-user.repository'

describe('DbUserRepository Integration Tests', () => {
  let repository: DbUserRepository
  let prismaService: PrismaService

  beforeAll(() => {
    // Run migrations on the test database
    execSync('npx prisma migrate deploy')
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [DbUserRepository, PrismaService]
    }).compile()

    repository = module.get<DbUserRepository>(DbUserRepository)
    prismaService = module.get<PrismaService>(PrismaService)

    // Clean the database before each test
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    // Disconnect from the database
    await prismaService.$disconnect()
  })

  it('should create a user and find it by id', async () => {
    const email = new Email('test@example.com')
    const password = new Password('password123')
    const user = new User('1', email, password)

    const createdUser = await repository.create(user)
    const foundUser = await repository.findById(createdUser.id)

    expect(foundUser).toBeInstanceOf(User)
    expect(foundUser?.id).toEqual(createdUser.id)
    expect(foundUser?.email.toString()).toEqual(email.toString())
  })

  it('should create a user and find it by email', async () => {
    const email = new Email('test2@example.com')
    const password = new Password('password123')
    const user = new User('2', email, password)

    await repository.create(user)
    const foundUser = await repository.findByEmail(email.toString())

    expect(foundUser).toBeInstanceOf(User)
    expect(foundUser?.email.toString()).toEqual(email.toString())
  })

  it('should return null when user is not found by id', async () => {
    const foundUser = await repository.findById('non-existent-id')
    expect(foundUser).toBeNull()
  })

  it('should return null when user is not found by email', async () => {
    const foundUser = await repository.findByEmail('non-existent@example.com')
    expect(foundUser).toBeNull()
  })
})
