import type { CreateUserDto } from '@auth-system/types'

import type { IUser } from '~/shared/domain'

// For demo purposes
export interface IUserRepository {
  getUsers(): Promise<IUser[]>
  createUser(user: CreateUserDto): Promise<IUser>
}
