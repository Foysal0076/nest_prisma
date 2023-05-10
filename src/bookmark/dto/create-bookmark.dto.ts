import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateBookmarkDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  title: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  link: string
}
