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
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Bookmark } from './entities/bookmark.entity'

@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
@ApiTags('Bookmarks')
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
  @ApiBearerAuth()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @Post()
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Bookmark,
  })
  updateBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: CreateBookmarkDto
  ) {
    return this.bookmarkService.updateBookmark(userId, bookmarkId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'No content' })
  deleteBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.deleteBookmark(userId, bookmarkId)
  }
}
