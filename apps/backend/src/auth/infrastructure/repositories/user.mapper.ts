import type { User as PrismaUser, Role } from '@prisma/client'

import type { UserRole } from '~/auth/domain/entities/user.entity'
import { User } from '~/auth/domain/entities/user.entity'
import { Email } from '~/auth/domain/value-objects/email.vo'
import { Password } from '~/auth/domain/value-objects/password.vo'

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      new Email(prismaUser.email),
      new Password(prismaUser.hashedPassword),
      prismaUser.role as UserRole
    )
  }

  static toPersistence(domainUser: User) {
    return {
      id: domainUser.id,
      email: domainUser.email.toString(),
      hashedPassword: domainUser.password.toString(),
      role: domainUser.role as Role
    }
  }
}
