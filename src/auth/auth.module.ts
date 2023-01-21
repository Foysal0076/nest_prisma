import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from '../auth/auth.controller'
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/strategy'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule, JwtModule.register({})], // to use other modules
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
