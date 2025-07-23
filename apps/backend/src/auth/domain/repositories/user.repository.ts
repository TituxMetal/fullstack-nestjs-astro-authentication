import type { User } from '~/auth/domain/entities/user.entity'

export const IUserRepository = Symbol('IUserRepository')

export interface IUserRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
