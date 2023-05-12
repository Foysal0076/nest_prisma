import { ApiProperty } from '@nestjs/swagger'
import { PaginationMetaDto } from './pagination-meta.dto'

export class PaginatedDto<TData> {
  @ApiProperty()
  readonly meta: PaginationMetaDto

  @ApiProperty({ isArray: true })
  results: TData[]

  constructor(results: TData[], meta: PaginationMetaDto) {
    this.results = results
    this.meta = meta
  }
}
