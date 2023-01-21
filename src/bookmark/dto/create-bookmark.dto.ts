import { IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateBookmarkDto {
  @IsString()
  @MaxLength(30)
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  link: string
}
