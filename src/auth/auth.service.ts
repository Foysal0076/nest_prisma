import { Injectable } from '@nestjs/common'

@Injectable({})
export class AuthService {
  login() {
    return { message: 'Sign In' }
  }

  signUp() {
    return { message: 'sign up' }
  }
}
