// import { User } from '@auth-system/types'
import { Injectable } from '@nestjs/common'

import { IAuthUser } from '~/auth/domain'
import { IUser } from '~/shared/domain'

@Injectable()
export class UserService {
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

  getUsers(): IUser {
    const user: IUser = {
      id: '1',
      email: 'john.doe@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return user
  }
}
