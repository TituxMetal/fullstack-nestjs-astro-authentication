import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthService } from '~/auth/application/services/auth.service'
import { DatabaseModule } from '~/shared/infrastructure'

import { DbUserRepository } from './repositories/db-user.repository'

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    AuthService,
    {
      provide: 'IUserRepository',
      useClass: DbUserRepository
    }
  ],
  exports: [AuthService, 'IUserRepository']
})
export class AuthModule {}
