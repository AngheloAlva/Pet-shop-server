import type { Product } from './products.types'

interface Category {
  id: number
  name: string
  description: string
  image: string
  createdAt: Date
  products: Product[]
  isAvailable: boolean
}

interface CreateCategory {
  name: string
  description: string
  image: string
}

interface UpdateCategory {
  name?: string
  description?: string
  image?: string
}

export {
  type Category,
  type CreateCategory,
  type UpdateCategory
}