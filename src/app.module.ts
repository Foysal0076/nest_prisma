import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
