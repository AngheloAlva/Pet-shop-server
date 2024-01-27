import type { PaginationDto } from '../domain/shared/pagination.dto'

interface AvailableWithPagination extends PaginationDto {
  isAvailable?: boolean
}

export {
  type AvailableWithPagination
}
