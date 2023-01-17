import { Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from 'src/auth/auth.service'
import { SignupDto } from 'src/auth/dto'

@Controller('auth')
export class AuthController {
  // authService: AuthService
  // constructor(authService: AuthService) {
  //   this.authService = authService
  // }
  //Instead of doing above we can do the followings
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignupDto) {
    //req is the Request object of express
    console.log('Request body', signUpDto)
    return this.authService.signUp(signUpDto)
  }

  @Post('signin')
  signin(@Body() loginDto: SignupDto) {
    return this.authService.login(loginDto)
  }
}
