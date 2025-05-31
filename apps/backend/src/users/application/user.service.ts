// import { User } from '@auth-system/types'
import { CreateUserDto } from '@auth-system/types'
import { Inject, Injectable } from '@nestjs/common'

import { IAuthUser } from '~/auth/domain'
import { IUser } from '~/shared/domain'
import { IUserRepository } from '~/users/domain/repositories'

@Injectable()
export class UserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  // TODO: remove this method
  getAuthUser(): IAuthUser {
    const authUser: IAuthUser = {
      id: '1',
      email: 'john.doe@example.com',
      token: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return authUser
  }
  // For demo purposes
  async getUsers(): Promise<IUser[]> {
    return await this.userRepository.getUsers()
  }

  // For demo purposes
  async createUser(user: CreateUserDto): Promise<IUser> {
    return this.userRepository.createUser(user)
  }
}
