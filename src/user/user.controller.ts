import {  Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guard'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('details')
  getUserDetails(@Req() req: Request) {
    return this.userService.getUserDetails(req.user)
  }
}
