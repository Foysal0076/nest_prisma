import { Controller, Post } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'

@Controller('auth')
export class AuthController {
  // authService: AuthService
  // constructor(authService: AuthService) {
  //   this.authService = authService
  // }
  //Instead of doing above we can do the followings
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp() {
    return this.authService.signUp()
  }

  @Post('signin')
  signin() {
    return this.authService.login()
  }
}
