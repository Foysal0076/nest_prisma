import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EditUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUserDetails(user: any) {
    return user
  }

  async updateUser(id: number, dto: EditUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      })
      delete user.password
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
