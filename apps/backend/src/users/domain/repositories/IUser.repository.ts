import type { CreateUserDto } from '@auth-system/types'

import type { User } from '~/users/domain/entities/user.entity'

// For demo purposes
export interface IUserRepository {
  getUsers(): Promise<User[]>
  createUser(user: CreateUserDto): Promise<User>
}
