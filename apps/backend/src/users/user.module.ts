import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UserService } from '~/users/application'
import { UserController } from '~/users/infrastructure'

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
