import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserDetails(@Req() req: Request) {
    console.log(req.user)
    return this.userService.getUserDetails()
  }
}
