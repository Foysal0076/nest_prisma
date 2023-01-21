import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateBookmarkDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  title?: string

  @IsOptional()
  @IsString()
  @MaxLength(30)
  description?: string

  @IsOptional()
  @IsString()
  link?: string
}
