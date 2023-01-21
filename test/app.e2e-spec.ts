import { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma/prisma.service'
import * as pactum from 'pactum'
import { SignupDto } from '../src/auth/dto'
import { EditUserDto } from '../src/user/dto'

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
    app.listen(5001)
    const prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl('http://localhost:5001')
  })

  //teardown logic
  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: SignupDto = {
      email: 'test@foy.com',
      password: 'test-password',
    }
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: 'test1234' })
          .expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: 'test@foy.com' })
          .expectStatus(400)
      })
      it('should throw if password and email is empty', () => {
        return pactum.spec().post('/auth/signup').withBody({}).expectStatus(400)
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
        // .inspect() //*This console request and response
      })
    })
    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: 'test1234' })
          .expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'test@foy.com' })
          .expectStatus(400)
      })
      it('should throw if password and email is empty', () => {
        return pactum.spec().post('/auth/signin').withBody({}).expectStatus(400)
      })
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('accessToken', 'accessToken')
        // .inspect() //*This console request and response
      })
    })
  })
  describe('User', () => {
    describe('Get user details', () => {
      it('should get logged in user details', () => {
        return pactum
          .spec()
          .get('/user/details')
          .withHeaders({ Authorization: 'Bearer $S{accessToken}' }) //This way access token will be applied here
          .expectStatus(200)
      })
    })
    describe('Edit user information', () => {
      it('should update user', () => {
        const dto: EditUserDto = {
          firstName: 'Foysal',
          lastName: 'Ahmed',
        }
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
      })
    })
  })

  describe('Bookmark', () => {
    describe('Create bookmark', () => {})
    describe('Get bookmarks', () => {})
    describe('Get bookmark by id', () => {})
    describe('Update bookmark by id', () => {})
    describe('Delete bookmark by id', () => {})
  })
})
