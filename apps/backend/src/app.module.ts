import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from '~/shared/infrastructure'
import { UserModule } from '~/users'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UserModule]
})
export class AppModule {}
