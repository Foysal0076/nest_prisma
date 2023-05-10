import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto'

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    try {
      const bookmarks = await this.prisma.bookmark.findMany({
        where: {
          userId: userId,
        },
      })
      return bookmarks
    } catch (error) {
      throw error
    }
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      console.log({ bookmarkId })
      const foundBookmark = await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      })
      if (!foundBookmark) {
        throw new NotFoundException('Record not found')
      }
      return foundBookmark
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async createBookMark(userId: number, data: CreateBookmarkDto) {
    try {
      const createdBookmark = await this.prisma.bookmark.create({
        data: {
          userId,
          ...data,
        },
      })
      return createdBookmark
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateBookmark(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto
  ) {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      })

      if (!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException('Access to resource denied')
      }

      const updatedBookmark = this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      })
      return updatedBookmark
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    })

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied')
    }

    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    })
  }
}
