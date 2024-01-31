import type { CreateOption, Option } from './option.types'
import type { ProductCart } from './product-cart.types'
import type { Brand } from './brand.types'

interface Product {
  id: number
  categoryId: number
  petType: string[]
  name: string
  miniDesc: string
  description: string
  images: string[]
  options?: Option[]
  brand?: Brand
  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN' | 'ALL_LIFE_STAGES'
  brandId: number
  isAvailable: boolean
  createdAt: Date
  cart?: ProductCart[]
}

interface CreateProduct {
  categoryId: number
  petType: string[]
  name: string
  slug: string
  miniDesc: string
  description: Array<{ title: string, content: string }>
  images: string[]
  brandId: number
  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN' | 'ALL_LIFE_STAGES'
  options: CreateOption
}

interface UpdateProduct {
  categoryId?: number
  petType?: string[]
  name?: string
  slug?: string
  miniDesc?: string
  description?: Array<{ title: string, content: string }>
  images?: string[]
  brandId?: number
  lifeStage?: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN'
}

interface UpdatedDataUpdatedProduct {
  categoryId?: number
  petType?: string[]
  name?: string
  slug?: string
  miniDesc?: string
  description?: string
  images?: string[]
  brandId?: number
  lifeStage?: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN' | 'ALL_LIFE_STAGES'
}

export {
  type Product,
  type CreateProduct,
  type UpdateProduct,
  type UpdatedDataUpdatedProduct
}
