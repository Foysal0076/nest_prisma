import { ForbiddenException, Injectable } from '@nestjs/common'
import { SignupDto } from 'src/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
@Injectable()
export class AuthService {
  prisma: PrismaService
  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  async login({ email, password }: SignupDto) {
    try {
      const foundUser = await this.prisma.user.findUnique({ where: { email } })
      if (!foundUser) {
        throw new ForbiddenException('Invalid credentials')
      }
      const pwMatches = await argon.verify(foundUser.password, password)
      if (!pwMatches) {
        throw new ForbiddenException('Invalid credentials')
      }

      delete foundUser.password
      return foundUser
    } catch (error) {}
    return { message: 'Sign In' }
  }

  async signUp({ email, password }: SignupDto) {
    //hash the password
    const hash = await argon.hash(password)

    // save the new user in the db
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email,
          password: hash,
        },
      })
      // return the saved user
      return createdUser
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }
}
