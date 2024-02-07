import type { PaginationDto } from '../domain/shared/pagination.dto'

interface AvailableWithPagination extends PaginationDto {
  isAvailable?: boolean
}

interface GetProductsWithFilters extends PaginationDto {
  search?: string
  petType?: string
  maxPrice?: string
  minPrice?: string
  brandSlug?: string
  lifeStage?: string
  isAvailable?: boolean
  categorySlug?: string
}

export {
  type GetProductsWithFilters,
  type AvailableWithPagination
}
