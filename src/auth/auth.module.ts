import { Module } from '@nestjs/common'
import { AuthController } from 'src/auth/auth.controller'
import { AuthService } from 'src/auth/auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule], // to use other modules
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
