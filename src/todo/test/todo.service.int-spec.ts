import { Test } from '@nestjs/testing'
import { PrismaService } from '../../prisma/prisma.service'
import { AppModule } from '../../app.module'
import { CreateTodoDto, UpdateTodoDto } from '../dto'
import { CreateUserDto } from '../../user/dto'
import * as pactum from 'pactum'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { async } from 'rxjs'

describe('TodoService Int', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    app.listen(3333)
    const prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl('http://localhost:3333')
  })

  //teardown logic
  afterAll(() => {
    app.close()
  })

  describe('createTodo', () => {
    const userDataDto: CreateUserDto = {
      email: 'testuser@test.com',
      password: '1234',
      firstName: 'Test',
      lastName: 'User',
    }

    it('should signup user', async () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(userDataDto)
        .expectStatus(201)
    })

    it('should signin user', async () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({ email: userDataDto.email, password: userDataDto.password })
        .expectStatus(200)
        .stores('accessToken', 'accessToken')
    })

    const todoData: CreateTodoDto = {
      title: 'Todo 1',
      description: 'Todo 1 description',
    }

    it('should create todo', async () => {
      return pactum
        .spec()
        .post('/todo')
        .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
        .withBody(todoData)
        .expectStatus(201)
        .expectBodyContains(todoData.title)
        .expectBodyContains(todoData.description)
        .stores('todoId', 'id')
    })

    it('should throw duplicate error', async () => {
      return pactum
        .spec()
        .post('/todo')
        .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
        .withBody(todoData)
        .expectStatus(403)
    })
  })

  describe('updateTodo', () => {
    const updateDto: UpdateTodoDto = {
      title: 'First To Do',
    }

    it('should update todo', async () => {
      return pactum
        .spec()
        .patch('/todo/{id}')
        .withPathParams('id', '$S{todoId}')
        .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
        .withBody(updateDto)
        .expectStatus(HttpStatus.OK)
        .expectBodyContains(updateDto.title)
    })
  })
})
