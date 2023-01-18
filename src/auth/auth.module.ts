import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from 'src/auth/auth.controller'
import { AuthService } from 'src/auth/auth.service'
import { JwtStrategy } from 'src/auth/strategy'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule, JwtModule.register({})], // to use other modules
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
