import { CreateUserDto } from '@auth-system/types'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Logger,
  Post
} from '@nestjs/common'

import { UserService } from '~/users/application'
import { User } from '~/users/domain/entities/user.entity'
import { InvalidEmailError, UserAlreadyExistsError } from '~/users/domain/errors/user.errors'

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

  // For demo purposes
  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userService.createUser(user)
      this.logger.log('newUser from controller', newUser)

      return newUser
    } catch (error) {
      if (error instanceof InvalidEmailError) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message)
      }

      throw error
    }
  }
}
