import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  async getUserDetails(user: any) {
    return user
  }
}
