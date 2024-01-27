import type { Product } from './products.types'

interface Brand {
  id: number
  name: string
  slug: string
  isAvailable: boolean
  image: string
  products?: Product[]
}

interface CreateBrand {
  name: string
  image: string
  slug: string
}

interface UpdateBrand {
  name?: string
  image?: string
  slug?: string
}

export {
  type Brand,
  type CreateBrand,
  type UpdateBrand
}
