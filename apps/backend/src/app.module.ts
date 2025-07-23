import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth/infrastructure/auth.module'
import { DatabaseModule } from '~/shared/infrastructure'
import { UserModule } from '~/users'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthModule, UserModule]
})
export class AppModule {}
