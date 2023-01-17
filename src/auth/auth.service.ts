import { Injectable } from '@nestjs/common'
import { SignupDto } from 'src/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  prismaService: PrismaService
  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService
  }

  login() {
    return { message: 'Sign In' }
  }

  signUp({ email, password }: SignupDto) {
    return { message: email }
  }
}
