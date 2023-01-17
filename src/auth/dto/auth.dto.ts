import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
