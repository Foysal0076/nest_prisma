import { ForbiddenException, Injectable } from '@nestjs/common'
import { SignupDto } from '../auth/dto'
import { PrismaService } from '../prisma/prisma.service'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class AuthService {
  prisma: PrismaService
  constructor(
    prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {
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

      return this.signToken(foundUser.id, foundUser.email)
    } catch (error) {
      throw error
    }
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
      return this.signToken(createdUser.id, createdUser.email)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async signToken(userId: number, email: string) {
    const payload = { sub: userId, email }
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    })
    return { accessToken }
  }
}
