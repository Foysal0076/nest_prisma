import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from '../auth/auth.service'
import { SignupDto } from '../auth/dto'

@Controller('auth')
export class AuthController {
  // authService: AuthService
  // constructor(authService: AuthService) {
  //   this.authService = authService
  // }
  //Instead of doing above we can do the followings
  constructor(private authService: AuthService) {}

  //This will automatically send a 201 response
  @Post('signup')
  signUp(@Body() signUpDto: SignupDto) {
    //req is the Request object of express
    console.log('Request body', signUpDto)
    return this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() loginDto: SignupDto) {
    return this.authService.login(loginDto)
  }
}
