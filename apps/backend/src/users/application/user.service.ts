// import { User } from '@auth-system/types'
import { CreateUserDto } from '@auth-system/types'
import { Inject, Injectable } from '@nestjs/common'

import { User } from '~/users/domain/entities/user.entity'
import { IUserRepository } from '~/users/domain/repositories'

@Injectable()
export class UserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  // For demo purposes
  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers()
  }

  // For demo purposes
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = User.create(Math.random().toString().slice(2), dto.email, dto.password)

    const savedUser = await this.userRepository.createUser({
      email: user.getEmail(),
      password: user.getPassword() ?? ''
    })

    return User.fromPersistence({
      id: savedUser.getId(),
      email: savedUser.getEmail(),
      hashedPassword: savedUser.getPassword(),
      createdAt: savedUser.getCreatedAt(),
      updatedAt: savedUser.getUpdatedAt()
    })
  }
}
