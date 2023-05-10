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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SigninEntity, SignupEntity } from './entities'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  // authService: AuthService
  // constructor(authService: AuthService) {
  //   this.authService = authService
  // }
  //Instead of doing above we can do the followings
  constructor(private authService: AuthService) {}

  //This will automatically send a 201 response
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiCreatedResponse({
    description: 'Access token is sent',
    type: SignupEntity,
  })
  signUp(@Body() signUpDto: SignupDto) {
    //req is the Request object of express
    return this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOkResponse({
    description: 'Access token is sent',
    type: SigninEntity,
  })
  signin(@Body() loginDto: SignupDto) {
    return this.authService.login(loginDto)
  }
}
