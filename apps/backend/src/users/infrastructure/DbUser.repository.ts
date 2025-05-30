import type { CreateUserDto, User } from '@auth-system/types'
import { Injectable } from '@nestjs/common'

import { PrismaService } from '~/shared/infrastructure/database/prisma.service'
import type { IUserRepository } from '~/users/domain/repositories'

// For demo purposes
@Injectable()
export class DbUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = {
      email: user.email,
      hashedPassword: user.password
    }

    return this.prisma.user.create({
      data: newUser,
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }
}
