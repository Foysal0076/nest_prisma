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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard) //This must be used for @GetUser() decorator to be working
  @Get('details')
  // getUserDetails(@Req() req: Request) {
  //   return this.userService.getUserDetails(req.user)
  // }
  getUserDetails(@GetUser() user: User, @GetUser('email') email: string) {
    // console.log(email)
    return this.userService.getUserDetails(user)
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  editUser(@GetUser('id') id: number, @Body() dto: EditUserDto) {
    return this.userService.updateUser(id, dto)
  }
}
