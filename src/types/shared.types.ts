import type { PaginationDto } from '../domain/shared/pagination.dto'

interface AvailableWithPagination extends PaginationDto {
  isAvailable?: boolean
}

interface GetProductsWithFilters extends PaginationDto {
  order?: string
  search?: string
  sortBy?: string
  petType?: string
  maxPrice?: string
  minPrice?: string
  brandSlug?: string
  lifeStage?: string
  isAvailable?: boolean
  categorySlug?: string
  isDiscounted?: boolean
}

export {
  type GetProductsWithFilters,
  type AvailableWithPagination
}
