import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @MaxLength(20)
  @IsOptional()
  firstName?: string

  @IsString()
  @MaxLength(20)
  @IsOptional()
  lastName?: string
}
