import type { CreateUserDto } from '@auth-system/types'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DatabaseError } from '~/shared/domain/errors/database.error'
import { PrismaService } from '~/shared/infrastructure/database/prisma.service'
import { User } from '~/users/domain/entities/user.entity'
import { UserAlreadyExistsError } from '~/users/domain/errors/user.errors'
import type { IUserRepository } from '~/users/domain/repositories'

// For demo purposes
@Injectable()
export class DbUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return users.map(user => User.fromPersistence(user))
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser: Prisma.UserCreateInput = {
        email: user.email,
        hashedPassword: user.password
      }
      const createdUser = await this.prisma.user.create({
        data: newUser,
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return User.fromPersistence(createdUser)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new UserAlreadyExistsError(user.email)
      }

      throw new DatabaseError(error instanceof Error ? error.message : 'Unknown database error')
    }
  }
}
