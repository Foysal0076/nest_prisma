import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtAuthGuard } from '../auth/guard'
import { BookmarkService } from './bookmark.service'
import { CreateBookmarkDto } from './dto'
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Bookmark } from './entities/bookmark.entity'

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('bookmarks')
@ApiTags('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get bookmark by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Bookmark })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId)
  }

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @Post()
  @ApiOperation({ summary: 'Create bookmark' })
  @ApiResponse({
    status: 200,
    description: 'The bookmark is created',
    type: Bookmark,
  })
  createBookMark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto
  ) {
    return this.bookmarkService.createBookMark(userId, dto)
  }

  @Patch(':id')
  updateBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: CreateBookmarkDto
  ) {
    return this.bookmarkService.updateBookmark(userId, bookmarkId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.deleteBookmark(userId, bookmarkId)
  }
}
