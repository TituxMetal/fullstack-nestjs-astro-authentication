import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth/infrastructure'
import { DatabaseModule } from '~/shared/infrastructure'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}
