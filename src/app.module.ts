import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from './user/user.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}
