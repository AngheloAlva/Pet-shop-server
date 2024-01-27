import type { CreateOption, Option } from './option.types'
import type { ProductCart } from './product-cart.types'
import type { Brand } from './brand.types'

interface Product {
  id: number
  categoryId: number
  petType: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'SMALL_ANIMAL'
  name: string
  miniDesc: string
  description: string
  images: string[]
  options?: Option[]
  brand?: Brand
  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN'
  brandId: number
  isAvailable: boolean
  createdAt: Date
  cart?: ProductCart[]
}

interface CreateProduct {
  categoryId: number
  petType: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'SMALL_ANIMAL'
  name: string
  slug: string
  miniDesc: string
  description: string
  images: string[]
  brandId: number
  lifeStage: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN'
  options: CreateOption
}

interface UpdateProduct {
  categoryId?: number
  petType?: 'DOG' | 'CAT' | 'BIRD' | 'FISH' | 'REPTILE' | 'SMALL_ANIMAL'
  name?: string
  slug?: string
  miniDesc?: string
  description?: string
  images?: string[]
  brandId?: number
  lifeStage?: 'PUPPY' | 'ADULT' | 'SENIOR' | 'KITTEN'
}

export {
  type Product,
  type CreateProduct,
  type UpdateProduct
}
