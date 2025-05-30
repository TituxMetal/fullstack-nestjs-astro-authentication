import { CreateUserDto, User } from '@auth-system/types'
import { Body, Controller, Get, Logger, Post } from '@nestjs/common'

import { UserService } from '~/users/application'

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  // For demo purposes
  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.userService.getUsers()
    this.logger.log('users from controller', users)

    return users
  }

  // TODO: remove this endpoint
  @Get('auth')
  getAuthUser() {
    const authUser = this.userService.getAuthUser()
    this.logger.log('authUser from controller', authUser)

    return authUser
  }

  // For demo purposes
  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const newUser = await this.userService.createUser(user)
    this.logger.log('newUser from controller', newUser)

    return newUser
  }
}
