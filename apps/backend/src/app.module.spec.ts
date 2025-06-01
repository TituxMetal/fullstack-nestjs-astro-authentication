import { ConfigModule } from '@nestjs/config'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'

import { AppModule } from './app.module'
import { DatabaseModule } from './shared/infrastructure'
import { UserModule } from './users'

describe('AppModule', () => {
  let app: TestingModule

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
  })

  afterEach(async () => {
    if (app) {
      await app.close()
    }
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })

  it('should have ConfigModule imported', () => {
    const configModule = app.get(ConfigModule)

    expect(configModule).toBeDefined()
  })

  it('should have DatabaseModule imported', () => {
    const databaseModule = app.get(DatabaseModule)

    expect(databaseModule).toBeDefined()
  })

  it('should have UserModule imported', () => {
    const userModule = app.get(UserModule)

    expect(userModule).toBeDefined()
  })
})
