import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '~/shared/infrastructure'
import { UserService } from '~/users/application'
import { UserController } from '~/users/infrastructure'

import { DbUserRepository } from './DbUser.repository'

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: DbUserRepository
    }
  ],
  exports: [UserService]
})
export class UserModule {}
