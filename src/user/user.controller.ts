import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'
import { GetUser } from 'src/auth/decorator/get-user.decorator'
import { JwtAuthGuard } from 'src/auth/guard'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('details')
  // getUserDetails(@Req() req: Request) {
  //   return this.userService.getUserDetails(req.user)
  // }
  getUserDetails(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email)
    return this.userService.getUserDetails(user)
  }
}
