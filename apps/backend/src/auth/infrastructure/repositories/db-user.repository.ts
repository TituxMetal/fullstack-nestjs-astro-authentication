import { Injectable } from '@nestjs/common'

import { User } from '~/auth/domain/entities/user.entity'
import { IUserRepository } from '~/auth/domain/repositories/user.repository'
import { PrismaService } from '~/shared/infrastructure/database/prisma.service'

import { UserMapper } from './user.mapper'

@Injectable()
export class DbUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(user)
    const newPrismaUser = await this.prisma.user.create({
      data: persistenceModel
    })

    return UserMapper.toDomain(newPrismaUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!prismaUser) {
      return null
    }

    return UserMapper.toDomain(prismaUser)
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!prismaUser) {
      return null
    }

    return UserMapper.toDomain(prismaUser)
  }
}
