import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  
  async getUserDetails() {
    return { user: 'User name' }
  }
}
