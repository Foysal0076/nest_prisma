import { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma/prisma.service'

describe('App e2e', () => {
  let app: INestApplication
  beforeAll(async () => {
    //Simulate the server
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    const prisma = app.get(PrismaService)
    await prisma.cleanDB()
  })

  //teardown logic
  afterAll(() => {
    app.close()
  })

  it.todo('pass')
})
