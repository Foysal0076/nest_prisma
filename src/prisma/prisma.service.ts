import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    })
  }

  cleanDB() {
    // $transaction will make sure the codes execute in order
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ])
  }
}
