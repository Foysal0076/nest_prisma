import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Global() //This will make this module to all other modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //must be exported to use it in another modules
})
export class PrismaModule {}
