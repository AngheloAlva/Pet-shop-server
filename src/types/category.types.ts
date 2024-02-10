import type { PetType } from '@prisma/client'
import type { Product } from './products.types'

interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  petType: PetType
  createdAt: Date
  products?: Product[]
  isAvailable: boolean
}

interface CreateCategory {
  authId: string
  name: string
  slug: string
  description: string
  image: string
  petType: PetType
}

interface UpdateCategory {
  name?: string
  slug?: string
  description?: string
  image?: string
}

export {
  type Category,
  type CreateCategory,
  type UpdateCategory
}
