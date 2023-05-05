import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @MaxLength(20)
  @IsOptional()
  firstName?: string

  @IsString()
  @MaxLength(20)
  @IsOptional()
  lastName?: string
}
