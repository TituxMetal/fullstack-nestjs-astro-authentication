import { Controller, Get, Logger } from '@nestjs/common'

import { UserService } from '~/users/application'

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    const user = this.userService.getUsers()
    this.logger.log('user from controller', user)

    return user
  }

  @Get('auth')
  getAuthUser() {
    const authUser = this.userService.getAuthUser()
    this.logger.log('authUser from controller', authUser)

    return authUser
  }
}
