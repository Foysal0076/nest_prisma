import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'
// import { Request } from 'express'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { JwtAuthGuard } from '../auth/guard'
import { UserService } from '../user/user.service'
import { EditUserDto } from './dto'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserEntity } from './entities'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard) //This must be used for @GetUser() decorator to be working
  @Get('details')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user details',
  })
  @ApiOkResponse({ description: 'User details', type: UserEntity })
  // getUserDetails(@Req() req: Request) {
  //   return this.userService.getUserDetails(req.user)
  // }
  getUserDetails(@GetUser() user: User) {
    return this.userService.getUserDetails(user)
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({
    description: 'User details has been updated',
    type: UserEntity,
  })
  editUser(@GetUser('id') id: number, @Body() dto: EditUserDto) {
    return this.userService.updateUser(id, dto)
  }
}
